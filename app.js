(()=>{"use strict";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const buttons=$$(".upload-btn"),fileInput=$("#fileInput"),fileName=$("#fileName");
let selectedFile=null;
const CHUNK=768*1024,MIN_RUN=1400;
const icons={
 arrow:'<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6"/></svg><svg class="success-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>',
 check:'<svg class="success-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>'
};
buttons.forEach(btn=>{
 const arrow=btn.querySelector("svg");
 const check=document.createElementNS("http://www.w3.org/2000/svg","svg");
 check.setAttribute("viewBox","0 0 24 24");check.classList.add("success-icon");
 check.innerHTML='<path d="m5 12 4.5 4.5L19 7"/>';
 btn.appendChild(check);
 btn.addEventListener("click",()=>upload(btn));
});
fileInput.addEventListener("change",()=>{
 selectedFile=fileInput.files?.[0]||null;
 fileName.textContent=selectedFile?`${selectedFile.name} · ${formatBytes(selectedFile.size)}`:"No file selected · Try any file";
 resetButtons();
});
function formatBytes(n){if(n<1024)return n+" B";if(n<1024*1024)return (n/1024).toFixed(0)+" KB";return (n/1024/1024).toFixed(1)+" MB"}
function clamp01(v){return Math.max(0,Math.min(1,v))}
function setP(btn,v){btn.style.setProperty("--p",clamp01(v).toFixed(4))}
function setMeta(id,text){const el=$(`[data-meta="${id}"]`);if(el)el.textContent=text}
function resetButtons(){buttons.forEach(b=>{b.classList.remove("loading","done");b.querySelector(".label")&&(b.querySelector(".label").textContent="Upload");setP(b,0);setMeta(b.dataset.upload,"")})}
function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
async function* readBlob(blob){
 const total=blob.size;
 if(total===0){yield {loaded:0,total};return}
 let loaded=0;
 while(loaded<total){
  const end=Math.min(loaded+CHUNK,total);
  const chunk=blob.slice(loaded,end);
  await chunk.arrayBuffer();
  loaded=end;
  yield {loaded,total};
 }
}
async function upload(btn){
 if(btn.dataset.busy==="1")return;
 btn.dataset.busy="1";btn.classList.remove("done");btn.classList.add("loading");
 const label=btn.querySelector(".label");if(label)label.textContent="Uploading";
 const file=selectedFile||new File([new Uint8Array(2.4*1024*1024)],"sample-upload.bin",{type:"application/octet-stream"});
 const started=performance.now();let shown=0;
 setP(btn,0);setMeta(btn.dataset.upload,`0 KB / ${formatBytes(file.size)}`);
 try{
  for await(const {loaded,total} of readBlob(file)){
   const elapsed=performance.now()-started;
   const ceiling=clamp01(elapsed/MIN_RUN);
   shown=Math.min(loaded/total,ceiling,1);
   setP(btn,shown);
   setMeta(btn.dataset.upload,`${formatBytes(loaded)} / ${formatBytes(total)}`);
   // The demo includes a gentle pacing floor so the liquid transition remains visible.
   await delay(loaded===total?0:110);
  }
  const remaining=Math.max(0,MIN_RUN-(performance.now()-started));
  if(remaining)await delay(remaining);
  setP(btn,1);
  btn.classList.remove("loading");btn.classList.add("done");
  if(label)label.textContent="Uploaded";
  setMeta(btn.dataset.upload,`${formatBytes(file.size)} read`);
 }catch(err){
  btn.classList.remove("loading");setP(btn,0);
  if(label)label.textContent="Try again";
  setMeta(btn.dataset.upload,"Upload failed");
 }finally{btn.dataset.busy="0"}
}
$("#reset").addEventListener("click",()=>{buttons.forEach(b=>{if(b.dataset.busy==="1")return;b.classList.remove("loading","done");const l=b.querySelector(".label");if(l)l.textContent="Upload";setP(b,0);setMeta(b.dataset.upload,"")})});
})();