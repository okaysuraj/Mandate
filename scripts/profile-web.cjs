// Profile a production Vite preview. No application credentials or test data required.
const {chromium} = require('../frontend/node_modules/@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const label = process.argv[2] || 'current';
const origin = process.env.PROFILE_ORIGIN || 'http://127.0.0.1:4173';
(async () => {
  const browser = await chromium.launch({headless: true});
  const samples = [];
  try {
    for (const route of ['/', '/login', '/forgot-password']) {
      for (let run = 0; run < 3; run++) {
        const context = await browser.newContext({viewport: {width: 390, height: 844}});
        const page = await context.newPage();
        const session = await context.newCDPSession(page);
        await session.send('Performance.enable');
        await session.send('Emulation.setCPUThrottlingRate', {rate: 4});
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(origin + route, {waitUntil: 'networkidle'});
        await session.send('HeapProfiler.collectGarbage');
        const {metrics} = await session.send('Performance.getMetrics');
        const metricsByName = Object.fromEntries(metrics.map(item => [item.name, item.value]));
        const resource = await page.evaluate(() => ({
          scripts: performance.getEntriesByType('resource').filter(item => new URL(item.name).pathname.endsWith('.js')).map(item => item.name),
          paints: Object.fromEntries(performance.getEntriesByType('paint').map(item => [item.name, item.startTime])),
          domCount: document.getElementsByTagName('*').length,
        }));
        let scriptBytes = 0, scriptGzipBytes = 0;
        for (const url of new Set(resource.scripts)) {
          if (new URL(url).origin !== origin) continue;
          const response = await fetch(url);
          const bytes = Buffer.from(await response.arrayBuffer());
          scriptBytes += bytes.length;
          scriptGzipBytes += zlib.gzipSync(bytes).length;
        }
        samples.push({route, run, scriptBytes, scriptGzipBytes,
          scriptCount: resource.scripts.length, heapBytes: metricsByName.JSHeapUsedSize,
          taskSeconds: metricsByName.TaskDuration, ...resource.paints, domCount: resource.domCount, errors});
        await context.close();
      }
    }
    const median = values => values.sort((a,b) => a-b)[Math.floor(values.length/2)];
    const summary = ['/', '/login', '/forgot-password'].map(route => {
      const rows = samples.filter(item => item.route === route);
      return {route, ...Object.fromEntries(['scriptBytes','scriptGzipBytes','heapBytes','taskSeconds','first-contentful-paint','domCount'].map(key => [key, median(rows.map(row => row[key]))]))};
    });
    const result = {checkedAt: new Date().toISOString(), label, environment: 'Headless Chromium, 390x844, 4x CPU throttle, fresh context, local production preview, heap after explicit GC; 3 samples per public route. Gzip is calculated, not server transfer.', summary, samples};
    fs.writeFileSync(path.resolve(__dirname, '../docs/performance-web-' + label + '.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify(summary, null, 2));
    if (samples.some(row => row.errors.length)) process.exitCode = 1;
  } finally { await browser.close(); }
})().catch(error => {console.error(error); process.exitCode = 1;});
