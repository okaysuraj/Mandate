// Isolated component fixtures: never loaded by production pages or written to a database.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const {chromium} = require('../frontend/node_modules/@playwright/test');
const root = path.resolve(__dirname, '../frontend');
const fixtureDir = path.join(root, 'test-results/performance');
(async () => {
  fs.mkdirSync(fixtureDir, {recursive:true});
  fs.writeFileSync(path.join(fixtureDir,'index.html'), '<div id="root"></div><script type="module" src="./fixture.jsx"></script>');
  fs.writeFileSync(path.join(fixtureDir,'fixture.jsx'), `
import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import KanbanBoard from '/src/components/core/KanbanBoard.jsx';
import ReferencePicker from '/src/components/features/ReferencePicker.jsx';
import '/src/index.css';
const statuses=['pending','in-progress','validation','completed'];
const records=Array.from({length:5000},(_,i)=>({_id:'task-'+i,title:'Record '+i,status:statuses[i%4],orderIndex:Math.floor(i/4)}));
function Fixture(){
 const [tasks,setTasks]=useState(records),[value,setValue]=useState(''),[multiple,setMultiple]=useState([]);
 return <main><ReferencePicker label="Task" options={records.map(t=>({value:t._id,label:t.title}))} value={value} onChange={v=>{window.selectedValue=v;setValue(v);}}/>
 <ReferencePicker label="Related tasks" multiple options={records.map(t=>({value:t._id,label:t.title}))} value={multiple} onChange={v=>{window.multipleValues=v;setMultiple(v);}}/>
 <KanbanBoard tasks={tasks} setTasks={next=>{window.updatedOrders=Object.fromEntries(next.map(t=>[t._id,t.orderIndex]));setTasks(next);}}/></main>;
}
createRoot(document.getElementById('root')).render(<Fixture/>);
`);
  const {createServer} = await import(pathToFileURL(path.join(root,'node_modules/vite/dist/node/index.js')).href);
  const server = await createServer({root,configFile:path.join(root,'vite.config.js'),server:{host:'127.0.0.1',port:5174,strictPort:true}});
  await server.listen();
  const browser = await chromium.launch({headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:900}});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:5174/test-results/performance/index.html');
    const finder=page.getByRole('combobox',{name:'Find task',exact:true});
    await finder.focus();
    assert.equal(await page.getByRole('option').count(),20);
    await finder.fill('Record 4999');
    assert.equal(await page.getByRole('option').count(),1);
    await finder.press('Enter');
    assert.equal(await page.evaluate(()=>window.selectedValue),'task-4999');
    const multi=page.getByRole('combobox',{name:'Find related tasks',exact:true});
    await multi.fill('Record 4000');
    await multi.press('Enter');
    assert.deepEqual(await page.evaluate(()=>window.multipleValues),['task-4000']);
    await multi.press('Escape');
    assert.equal(await page.locator('[data-rfd-draggable-id]').count(),120);
    await page.getByRole('navigation',{name:'Backlog pages'}).getByRole('button',{name:'Next',exact:true}).click();
    const card=page.locator('[data-rfd-draggable-id="task-120"]');
    await card.focus();
    await card.press('Space');
    await page.waitForTimeout(150);
    await card.press('ArrowDown');
    await page.waitForTimeout(150);
    await card.press('Space');
    await page.waitForFunction(()=>window.updatedOrders!==undefined);
    const orders=await page.evaluate(()=>window.updatedOrders);
    assert.equal(orders['task-120'],31);
    assert.equal(orders['task-124'],30);
    assert.equal(orders['task-116'],29);
    assert.equal(orders['task-128'],32);
    assert.equal(await page.locator('[data-rfd-draggable-id]').count(),120);
    assert.deepEqual(errors,[]);
    await page.screenshot({path:path.join(fixtureDir,'verified.png')});
    const result={checkedAt:new Date().toISOString(),passed:true,fixtureRecords:5000,maximumRenderedBoardCards:120,maximumRenderedReferenceChoices:20,checks:['Single reference search and keyboard selection','Multiple reference selection','Second-page keyboard drag preserves off-page ordering','No browser runtime errors'],scope:'Isolated real component tests with fixtures; not authenticated end-to-end tests'};
    fs.writeFileSync(path.resolve(__dirname,'../docs/performance-ui.json'),JSON.stringify(result,null,2)+'\n');
    console.log(JSON.stringify(result,null,2));
  } finally {await browser.close();await server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
