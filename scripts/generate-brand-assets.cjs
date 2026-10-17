// favicon.svg is the source of truth. Run `npm run brand:generate` after changing it.
const fs = require("node:fs/promises");
const path = require("node:path");
const { createRequire } = require("node:module");
const root = path.resolve(__dirname, "..");
const Jimp = createRequire(path.join(root, "mobile/package.json"))(
  "jimp-compact",
);

async function generate() {
  const svg = await fs.readFile(
    path.join(root, "frontend/public/favicon.svg"),
    "utf8",
  );
  const embedded = svg.match(/data:image\/png;base64,([^"]+)/);
  if (!embedded)
    throw new Error("Expected the embedded PNG artwork in favicon.svg.");
  const png = Buffer.from(embedded[1], "base64");
  const artwork = await Jimp.read(png);
  if (artwork.bitmap.width !== 1024 || artwork.bitmap.height !== 1024) {
    throw new Error("The brand artwork must be 1024 × 1024.");
  }
  const write = async (file, image) =>
    fs.writeFile(
      path.join(root, file),
      await image.getBufferAsync(Jimp.MIME_PNG),
    );
  // Copy the embedded PNG directly to preserve every pixel and its opaque RGB format.
  for (const name of ["icon", "logo", "splash-icon"])
    await fs.writeFile(path.join(root, `mobile/assets/${name}.png`), png);
  // Extra foreground padding keeps the mark inside Android launcher masks.
  const foreground = new Jimp(1024, 1024, 0x00000000);
  foreground.composite(artwork.clone().resize(736, 736), 144, 144);
  await write("mobile/assets/adaptive-icon.png", foreground);

  // Browser icons are needed only by the web app.
  const directory = "frontend/public";

  const maskable = new Jimp(1024, 1024, 0xffffffff);
  maskable.composite(foreground, 0, 0);
  await write(
    `${directory}/web-app-manifest-maskable-512x512.png`,
    maskable.resize(512, 512),
  );
  for (const [name, size] of [
    ["favicon-96x96", 96],
    ["apple-touch-icon", 180],
    ["web-app-manifest-192x192", 192],
    ["web-app-manifest-512x512", 512],
  ]) {
    await write(`${directory}/${name}.png`, artwork.clone().resize(size, size));
  }
  // ICO supports PNG frames for browser/platform fallbacks.
  const sizes = [16, 32, 48, 256];
  const frames = await Promise.all(
    sizes.map((size) =>
      artwork.clone().resize(size, size).getBufferAsync(Jimp.MIME_PNG),
    ),
  );
  const header = Buffer.alloc(6 + sizes.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((size, i) => {
    const entry = 6 + i * 16;
    header[entry] = header[entry + 1] = size === 256 ? 0 : size;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(frames[i].length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += frames[i].length;
  });
  await fs.writeFile(
    path.join(root, directory, "favicon.ico"),
    Buffer.concat([header, ...frames]),
  );

  await write("mobile/assets/favicon.png", artwork.clone().resize(96, 96));
  console.log("Generated web and mobile brand assets from favicon.svg.");
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
