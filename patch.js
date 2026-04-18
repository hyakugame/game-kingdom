(function(){
if(window.__qne)return;window.__qne=true;
var TH={"Uber Eats":"#00FF00","出前館":"#FF0000","ロケットナウ":"#FF8C00"};
var CL=["#FFD700","#FF6B00","#FF0055","#00FFFF","#FF00FF","#7FFF00"];
var fd=false,pc=-1,busy=false;
var h=new Date().getHours(),isDay=h>=6&&h<18;
var btn=document.createElement("button");
btn.id="qDayNightBtn";
btn.style.cssText="position:fixed;bottom:100px;right:16px;z-index:8000;background:rgba(20,28,48,0.92);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:50%;width:52px;height:52px;font-size:1.5rem;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.4);backdrop-filter:blur(8px)";
btn.textContent=isDay?"🌙":"☀️";
document.documentElement.style.filter=isDay?"brightness(1.25) contrast(1.05)":"brightness(0.8)";
btn.onclick=function(){var dy=btn.textContent==="🌙";document.documentElement.style.filter=dy?"brightness(0.8)":"brightness(1.25) contrast(1.05)";btn.textContent=dy?"☀️":"🌙";};
document.body.appendChild(btn);
var sb=document.createElement("div");sb.id="qstatBar";
sb.style.cssText="position:fixed;left:0;right:0;z-index:6999;background:rgba(8,18,32,0.96);backdrop-filter:blur(12px);border-bottom:1px solid rgba(78,180,100,0.3);padding:8px 14px;display:flex;gap:10px;overflow-x:auto;font-size:13px;font-weight:500;color:#94b8c8;white-space:nowrap;-webkit-overflow-scrolling:touch;box-shadow:0 2px 12px rgba(0,0,0,0.4)";
function positionBar(){
var appHdr=Array.from(document.querySelectorAll("div")).find(function(d){
var s=getComputedStyle(d);
return (s.position==="fixed"||s.position==="sticky")&&d.getBoundingClientRect().top<=5&&d.getBoundingClientRect().height>40&&d!==sb&&d.id!=="qstatBar";
});
var hdrH=appHdr?appHdr.getBoundingClientRect().height:62;
sb.style.top=hdrH+"px";
var root=document.getElementById("root");
if(root)root.style.paddingTop=(hdrH+sb.getBoundingClientRect().height+4)+"px";
}
document.body.appendChild(sb);
var cs=document.createElement("style");
cs.textContent=
"@keyframes qfpop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.3);opacity:1}100%{transform:scale(1);opacity:1}}"
+"@keyframes qffade{0%,65%{opacity:1}100%{opacity:0;transform:translateY(-50px)}}"
+"@keyframes qfly{0%{opacity:1}100%{transform:translate(var(--px),var(--py)) rotate(var(--pr));opacity:0}}"
+"#qstatBar::-webkit-scrollbar{display:none}"
+"#qstatBar span{background:rgba(255,255,255,0.06);border-radius:8px;padding:4px 10px;border:1px solid rgba(255,255,255,0.1);letter-spacing:.02em}"
+"#qstatBar b{color:#FFD700;font-weight:700}"
+".qfov{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;pointer-events:none;animation:qffade 4s forwards}"
+".qftx{font-size:3rem;font-weight:900;color:#FFD700;text-shadow:0 0 20px #FFD700,0 0 60px #FF8C00;font-family:monospace;letter-spacing:.1em;text-align:center;line-height:1.6;animation:qfpop .5s cubic-bezier(.34,1.56,.64,1) forwards}"
+".qpt{position:fixed;width:10px;height:10px;border-radius:2px;pointer-events:none;z-index:9998;animation:qfly var(--dur) ease-out forwards}";
document.head.appendChild(cs);
function fmt(m){return m<60?m+"分":Math.floor(m/60)+"h"+String(m%60).padStart(2,"0")+"m";}
function us(){
if(busy)return;busy=true;
try{
var raw=localStorage.getItem("qt5");if(!raw){busy=false;return;}
var qs=JSON.parse(raw);var now=new Date(),td=0,tr=0,aa=[],el=null;
qs.forEach(function(q){
var dn=q.done||0;td+=dn;
var sp=[].concat(q.bonuses||[]).sort(function(a,b){return a.count-b.count;});
tr+=sp.filter(function(s){return dn>=s.count;}).reduce(function(s,b){return s+b.reward;},0);
var lg=q.deliveryLog||[];
for(var i=1;i<lg.length;i++){var df=(new Date(lg[i].at)-new Date(lg[i-1].at))/60000;if(df>1&&df<90)aa.push(df);}
if(q.startedAt){var st=new Date(q.startedAt);if(!el||st<el)el=st;}
});
var eh=el?(now-el)/3600000:0;
var hy=eh>0.1?Math.round(tr/eh):0;
var av=aa.length>0?Math.round(aa.reduce(function(a,b){return a+b;},0)/aa.length):0;
var html=""
+"<span>合計&nbsp;<b>"+td+"件</b></span>"
+"<span>報酬&nbsp;<b>￥"+tr.toLocaleString()+"</b></span>"
+(eh>0.1?"<span>稼働&nbsp;<b>"+fmt(Math.round(eh*60))+"</b></span>":"")
+(hy>0?"<span>時給&nbsp;<b>￥"+hy.toLocaleString()+"</b></span>":"")
+(av>0?"<span>平均&nbsp;<b>"+av+"分/件</b></span>":"");
if(sb.innerHTML!==html){sb.innerHTML=html;positionBar();}
}catch(e){}
busy=false;
}
function at(c){
document.querySelectorAll("button").forEach(function(b){
if(b.id==="qDayNightBtn")return;
if(b.textContent.trim()==="+"){b.style.setProperty("background",c,"important");b.style.setProperty("box-shadow","0 0 20px "+c+"66","important");}
});
var best=null,ba=0;
document.querySelectorAll("div,section").forEach(function(el){
if(parseFloat(getComputedStyle(el).borderLeftWidth)<3)return;
var rc=el.getBoundingClientRect();var a=rc.width*rc.height;
if(a>ba){ba=a;best=el;}
});
if(best){best.style.setProperty("border-color",c,"important");best.style.setProperty("box-shadow","0 0 24px "+c+"44","important");}
}
function fever(){if(fd)return;fd=true;
for(var i=0;i<70;i++){(function(j){setTimeout(function(){
var p=document.createElement("div");p.className="qpt";
p.style.cssText="left:"+Math.random()*100+"vw;top:-10px;background:"+CL[Math.floor(Math.random()*6)]
+";--px:"+Math.round((Math.random()-.5)*200)+"px;--py:"+Math.round(60+Math.random()*110)+"vh"
+";--pr:"+Math.round(Math.random()*720)+"deg;--dur:"+(2+Math.random()*1.5).toFixed(1)+"s";
document.body.appendChild(p);setTimeout(function(){p.remove();},4000);
},j*20);})(i);}
var o=document.createElement("div");o.className="qfov";
o.innerHTML="<div class='qftx'>🔥 FEVER!! 🔥<br><span style='font-size:1.1rem;color:#fff;letter-spacing:.25em'>MAX REWARD ACHIEVED!</span></div>";
document.body.appendChild(o);setTimeout(function(){o.remove();fd=false;},4500);
}
var debTimer=null;
var obs=new MutationObserver(function(muts){
for(var i=0;i<muts.length;i++){if(muts[i].target===sb||sb.contains(muts[i].target))return;}
clearTimeout(debTimer);
debTimer=setTimeout(function(){
us();
var txt=document.body.innerText||"";
var gm=txt.match(/\/\s*(\d+)\s*件/);if(!gm)return;
var goal=parseInt(gm[1]),best=null,bsz=0;
document.querySelectorAll("*").forEach(function(el){
if(el.children.length>0)return;
var t=(el.textContent||"").trim();
if(!/^\d+$/.test(t))return;
var sz=parseFloat(getComputedStyle(el).fontSize)||0;
if(sz>bsz){bsz=sz;best=parseInt(t);}
});
if(best!==null&&best===goal&&goal>0&&best!==pc){pc=best;fever();}
else if(best!==null){pc=best;}
},300);
});
obs.observe(document.body,{childList:true,subtree:true});
setTimeout(function(){
positionBar();
var txt=document.body.innerText||"",c="#7B2FBE";
for(var k in TH){if(txt.includes(k)){c=TH[k];break;}}
at(c);us();
},800);
setInterval(us,30000);
})();