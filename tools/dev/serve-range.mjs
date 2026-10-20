import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^/([A-Za-z]:)/, "$1"));
const types = {".html":"text/html",".js":"text/javascript",".css":"text/css",".png":"image/png",".jpg":"image/jpeg",".webp":"image/webp",".mp4":"video/mp4",".ico":"image/x-icon",".xml":"application/xml",".txt":"text/plain"};
http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split("?")[0]); if(u==="/")u="/index.html"; const f=path.resolve(path.join(root,u));
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.statusCode=404;return res.end();}
 const size=fs.statSync(f).size; res.setHeader("content-type",types[path.extname(f)]||"application/octet-stream"); res.setHeader("cache-control","no-store"); res.setHeader("accept-ranges","bytes");
 const m=/bytes=(\d*)-(\d*)/.exec(req.headers.range||"");
 if(m){const start=m[1]?+m[1]:size-+m[2]; const end=m[1]&&m[2]?+m[2]:size-1; res.statusCode=206; res.setHeader("content-range",`bytes ${start}-${end}/${size}`); res.setHeader("content-length",end-start+1); return fs.createReadStream(f,{start,end}).pipe(res);}
 res.setHeader("content-length",size); fs.createReadStream(f).pipe(res);
}).listen(8766,"127.0.0.1",()=>console.log("http://localhost:8766"));
