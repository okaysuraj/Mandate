// Structural evidence only: this inventory does not certify each file's security.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {execFileSync} = require('node:child_process');
const parser = require('../frontend/node_modules/@babel/parser');
const root = path.resolve(__dirname, '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'shared/featureCatalog.json'), 'utf8'));
let sources;
try {
 sources=execFileSync('rg', ['--files', '--hidden', 'backend', 'frontend', 'mobile', 'shared', 'scripts', '-g', '!**/node_modules/**', '-g', '!**/dist/**', '-g', '!**/dist-audit/**', '-g', '!**/.expo/**', '-g', '!**/.cache/**', '-g', '!**/coverage/**', '-g', '!**/.env', '-g', '!**/.env.*', '-g', '!**/*service*account*.json', '-g', '!**/*credentials*.json'], {cwd: root, encoding: 'utf8'}).trim().split(/\r?\n/).filter(Boolean);
}catch(error){
 if(error.code!=='ENOENT')throw error;
 sources=[];
 const excluded=new Set(['node_modules','dist','dist-audit','.expo','.cache','coverage','.git']);
 const enumerate=directory=>{for(const entry of fs.readdirSync(path.join(root,directory),{withFileTypes:true})){const relative=path.join(directory,entry.name);if(entry.isDirectory()){if(!excluded.has(entry.name))enumerate(relative);}else if(entry.isFile()&&!/^\.env(?:\.|$)/.test(entry.name)&&!/(service.?account|credentials).*\.json$/i.test(entry.name))sources.push(relative);}};
 for(const directory of ['backend','frontend','mobile','shared','scripts'])enumerate(directory);
}
const files = [...new Set([...sources, ...['backend/.env.example','frontend/.env.example','mobile/.env.example'].filter(file=>fs.existsSync(path.join(root,file))), '.gitignore', 'package.json', 'README.md', '.github/workflows/verify.yml'])].sort();
const issues = [];
const resolveImport = (file, specifier) => {
  const base = path.resolve(root, path.dirname(file), specifier.split('?')[0]);
  if(fs.existsSync(path.join(base,'package.json'))){try{require.resolve(base);return true;}catch{}}
  return [base, ...['.js', '.jsx', '.json', '.ts', '.tsx'].map(ext=>base+ext), ...['index.js','index.jsx'].map(name=>path.join(base,name))].some(candidate=>fs.existsSync(candidate) && fs.statSync(candidate).isFile());
};
const walk = (node, visit) => {
  if (!node || typeof node !== 'object') return;
  if (typeof node.type === 'string') visit(node);
  for (const value of Object.values(node)) if(Array.isArray(value)) value.forEach(child=>walk(child,visit)); else if(value && typeof value==='object') walk(value,visit);
};
const rows = files.map(original => {
  const file = original.replaceAll('\\', '/');
  const bytes = fs.readFileSync(path.join(root,file));
  const ext = path.extname(file);
  const row = {file,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),verification:'asset/config inventory',featureKeys:catalog.filter(feature=>[feature.webFile,feature.mobileFile].includes(file)).map(feature=>feature.key)};
  if(['.js','.jsx','.cjs','.mjs','.ts','.tsx'].includes(ext)){
    try {
      const tree=parser.parse(bytes.toString('utf8'),{sourceType:'unambiguous',plugins:['jsx',...(ext.includes('ts')?['typescript']:[])]});
      row.verification='syntax and relative import resolution';
      if(/^(frontend|mobile)\/src\/(pages|screens)\//.test(file))row.dataFlow=/Feature(Page|Screen)/.test(bytes.toString('utf8'))?'Shared backend feature client; shared fields and endpoint selection':/\b(api|loadTasks|useDataStore|useAuth)\b/.test(bytes.toString('utf8'))?'Retained API/store/auth-backed screen':'Presentation/auth wrapper; inspect transitive data dependencies';
      walk(tree,node=>{
        const source=['ImportDeclaration','ExportNamedDeclaration','ExportAllDeclaration','ImportExpression'].includes(node.type)?node.source?.value:node.type==='CallExpression' && (node.callee?.name==='require'||node.callee?.type==='Import') && node.arguments?.[0]?.type==='StringLiteral'?node.arguments[0].value:null;
        if(source?.startsWith('.') && !resolveImport(file,source))issues.push({file,issue:'Unresolved relative import',source});
      });
      if(/\b(DEFAULT_TASKS|mockData|sampleTasks|demoTasks)\b|aida-public/.test(bytes.toString('utf8')) && /^(frontend|mobile)\/src\//.test(file))issues.push({file,issue:'Review possible fabricated data marker'});
    }catch(error){row.verification='syntax failed';issues.push({file,issue:error.message});}
  } else if(ext==='.json'){
    try {JSON.parse(bytes.toString('utf8'));row.verification='JSON syntax';}catch(error){issues.push({file,issue:error.message});}
  }
  return row;
});
const report={checkedAt:new Date().toISOString(),scope:'Repository source, configuration and assets; excludes dependencies, generated bundles, private environment files and credentials. Syntax/import checks are structural, not a per-file semantic security certification.',counts:Object.fromEntries(['backend','frontend','mobile','shared','scripts'].map(scope=>[scope,rows.filter(row=>row.file.startsWith(scope+'/')).length])),total:rows.length,issues,files:rows};
fs.mkdirSync(path.join(root,'docs'),{recursive:true});
fs.writeFileSync(path.join(root,'docs/source-inventory.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({counts:report.counts,total:report.total,issues},null,2));
if(issues.length)process.exitCode=1;
