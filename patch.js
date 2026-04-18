(function(){
if(window.__qne)return;window.__qne=true;
var TH={"Uber Eats":"#00FF00","出前館":"#FF0000","ロケットナウ":"#FF8C00"};
var CL=["#FFD700","#FF6B00","#FF0055","#00FFFF","#FF00FF","#7FFF00"];
var fd=false,pc=-1,busy=false;
var cs=document.createElement("style");
cs.textContent=
"@keyframes qfpop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.3);opacity:1}100%{transform:scale(1);opacity:1}}"
+"@keyframes qffade{0%,65%{opacity:1}100%{opacity:0;transform:translateY(-50px)}}"
+"@keyframes qfly{0%{opacity:1}100%{transform:translate(var(--px),var(--py)) rotate(var(--pr));opacity:0}}"
+"#qstatBar{position:fixed;left:0;right:0;z-index:6500;background:rgba(8,15,28,0.97);border-bottom:1px solid rgba(100,200,120,0.25);padding:7px 12px;display:flex;gap:8px;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch;box-shadow:0 2px 10px rgba(0,0,0,0.5)}"
+"#qstatBar::-webkit-scrollbar{display:none}"
+"#qstatBar span{background:rgba(255,255,255,0.07);border-radius:6px;padding:5px 10px;border:1px solid rgba(255,255,255,0.1);font-size:13px;font-weight:600;color:#b0ccd8;display:inline-flex;align-items:center;gap:4px}"
+"#qstatBar b{color:#FFD700}"
+"#qDayNightBtn{position:fixed!important;bottom:20px!important;left:14px!important;z-index:8500!important;width:48px!important;height:48px!important;border-radius:50%!important;background:rgba(15,25,45,0.95)!important;border:1px solid rgba(255,255,255,0.2)!important;color:#fff!important;font-size:1.4rem!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 3px 12px rgba(0,0,0,0.4)!important}"
+".qfov{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;pointer-events:none;animation:qffade 4s forwards}"
+".qftx{font-size:2.6rem;font-weight:900;color:#FFD700;text-shadow:0 0 20px #FFD700,0 0 50px #FF8C00;font-family:monospace;letter-spacing:.08em;text-align:center;line-height:1.6;animation:qfpop .5s cubic-bezier(.34,1.56,.64,1) forwards}"
+".qpt{position:fixed;width:10px;height:10px;border-radius:2px;pointer-events:none;z-index:9998;animation:qfly var(--dur) ease-out forwards}";
document.head.appendChild(cs);
var sb=document.createElement("div");sb.id="qstatBar";document.body.appendChild(sb);
var h=new Date().getHours(),isDay=h>=6&&h<18;
var btn=document.createElement("button");btn.id="qDayNightBtn";
btn.textContent=isDay?"🌙":"☀️";
document.documentElement.style.filter=isDay?"brightness(1.2)":"brightness(0.82)";
btn.onclick=function(){var dy=btn.textContent==="🌙";document.documentElement.style.filter=dy?"brightness(0.82)":"brightness(1.2)";btn.textContent=dy?"☀️":"🌙";};
document.body.appendChild(btn);
function getHdrH(){var best=0;Array.from(document.querySelectorAll("*")).forEach(function(el){if(el===sb||el===btn||sb.contains(el)||btn.contains(el))return;var s=getComputedStyle(el);if(s.position!=="fixed"&&s.position!=="sticky")return;var rc=el.getBoundingClientRect();if(rc.top<10&&rc.height>20&&rc.height<200&&rc.width>100){if(rc.bottom>best)best=rc.bottom;}});return best||62;}
function posBar(){var hh=getHdrH();sb.style.top=hh+"px";var sbH=sb.offsetHeight||36;var root=document.getElementById("root");if(root&&!root.dataset.qpadded){root.style.paddingTop=(hh+sbH+2)+"px";root.dataset.qpadded="1";}}
function fmt(m){return m<60?m+"分":Math.floor(m/60)+"h"+String(m%60).padStart(2,"0")+"m";}
function us(){if(busy)return;busy=true;try{var raw=localStorage.getItem("qt5");if(!raw){busy=false;return;}var qs=JSON.parse(raw);var now=new Date(),td=0,tr=0,aa=[],el=null;qs.forEach(function(q){var dn=q.done||0;td+=dn;var sp=[].concat(q.bonuses||[]).sort(function(a,b){return a.count-b.count;});var stepR=sp.filter(function(s){return dn>=s.count;}).reduce(function(s,b){return s+b.reward;},0);var allDone=sp.length>0&&dn>=(sp[sp.length-1]||{count:999}).count;var bExtra=allDone?parseInt(q.bonusExtra||0):0;tr+=stepR+bExtra;var lg=q.deliveryLog||[];for(var i=1;i<lg.length;i++){var df=(new Date(lg[i].at)-new Date(lg[i-1].at))/60000;if(df>1&&df<90)aa.push(df);}if(q.startedAt){var st=new Date(q.startedAt);if(!el||st<el)el=st;}});var eh=el?(now-el)/3600000:0;var hy=eh>0.1?Math.round(tr/eh):0;var av=aa.length>0?Math.round(aa.reduce(function(a,b){return a+b;},0)/aa.length):0;var html="<span>★ <b>"+td+"件</b></span><span>￥<b>"+tr.toLocaleString()+"</b></span>"+(eh>0.1?"<span>⏱ <b>"+fmt(Math.round(eh*60))+"</b></span>":"")+(hy>0?"<span>💴 <b>￥"+hy.toLocaleString()+"/h</b></span>":"")+(av>0?"<span>⏰ <b>"+av+"分/件</b></span>":"");if(sb.innerHTML!==html){sb.innerHTML=html;posBar();}}catch(e){}busy=false;}
function getColorForCard(el){
var txt=el.innerText||"";
if(txt.includes("Uber Eats")||txt.includes("uber"))return "#00FF00";
if(txt.includes("出前館")||txt.includes("demae"))return "#FF0000";
if(txt.includes("ロケット")||txt.includes("rocket"))return "#FF8C00";
return "#7B2FBE";
}
function applyThemes(){
document.querySelectorAll("button").forEach(function(b){
if(b.id==="qDayNightBtn")return;
if(b.textContent.trim()!=="+")return;
var card=b.closest?b.closest("[style]"):null;
var c="#7B2FBE";
if(card){
var p=card;for(var i=0;i<5;i++){if(p&&p.innerText){var bw=parseFloat(getComputedStyle(p).borderLeftWidth||0);if(bw>=3){c=getColorForCard(p);break;}p=p.parentElement;}}
}
b.style.setProperty("background",c,"important");
b.style.setProperty("box-shadow","0 0 18px "+c+"66","important");
});
document.querySelectorAll("div,section").forEach(function(el){
if(el===sb)return;
var bw=parseFloat(getComputedStyle(el).borderLeftWidth||0);
if(bw<3)return;
var c=getColorForCard(el);
el.style.setProperty("border-color",c,"important");
el.style.setProperty("box-shadow","0 0 22px "+c+"33","important");
});
}
function fever(){if(fd)return;fd=true;for(var i=0;i<70;i++){(function(j){setTimeout(function(){var p=document.createElement("div");p.className="qpt";p.style.cssText="left:"+Math.random()*100+"vw;top:-10px;background:"+CL[Math.floor(Math.random()*6)]+";--px:"+Math.round((Math.random()-.5)*200)+"px;--py:"+Math.round(60+Math.random()*110)+"vh;--pr:"+Math.round(Math.random()*720)+"deg;--dur:"+(2+Math.random()*1.5).toFixed(1)+"s";document.body.appendChild(p);setTimeout(function(){p.remove();},4000);},j*20);})(i);}var o=document.createElement("div");o.className="qfov";o.innerHTML="<div class='qftx'>🔥 FEVER!! 🔥<br><span style='font-size:1rem;color:#fff;letter-spacing:.2em'>MAX REWARD ACHIEVED!</span></div>";document.body.appendChild(o);setTimeout(function(){o.remove();fd=false;},4500);}
var debT=null;
new MutationObserver(function(muts){
for(var i=0;i<muts.length;i++){if(muts[i].target===sb||sb.contains(muts[i].target)||muts[i].target===btn)return;}
clearTimeout(debT);debT=setTimeout(function(){
us();applyThemes();
var txt=document.body.innerText||"";
var gm=txt.match(/\/\s*(\d+)\s*件/);if(!gm)return;
var goal=parseInt(gm[1]),best=null,bsz=0;
document.querySelectorAll("*").forEach(function(el){if(el.children.length>0)return;var t=(el.textContent||"").trim();if(!/^\d+$/.test(t))return;var sz=parseFloat(getComputedStyle(el).fontSize)||0;if(sz>bsz){bsz=sz;best=parseInt(t);}});
if(best!==null&&best===goal&&goal>0&&best!==pc){pc=best;fever();}else if(best!==null){pc=best;}
},300);
}).observe(document.body,{childList:true,subtree:true});
setTimeout(function(){posBar();applyThemes();us();},900);
window.addEventListener("resize",posBar);
setInterval(us,30000);
})();