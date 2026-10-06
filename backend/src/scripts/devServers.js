import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const server=spawn(process.execPath,['--watch',fileURLToPath(new URL('../server.js',import.meta.url))],{cwd:fileURLToPath(new URL('../../',import.meta.url)),stdio:'inherit'});
const frontend=spawn(process.execPath,[fileURLToPath(new URL('../../../frontend/node_modules/vite/bin/vite.js',import.meta.url))],{cwd:fileURLToPath(new URL('../../../frontend/',import.meta.url)),stdio:'inherit'});
const children=[server,frontend];let closing=false;
const close=()=>{if(closing)return;closing=true;for(const child of children)child.kill();};
for(const signal of ['SIGINT','SIGTERM'])process.once(signal,close);
for(const child of children){child.once('error',()=>{process.exitCode=1;close();});child.once('exit',code=>{if(code)process.exitCode=code;close();});}
