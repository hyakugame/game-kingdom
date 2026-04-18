(function(){
if(window.__qne)return;window.__qne=true;
var TH={"Uber Eats":"#00FF00","出前館":"#FF0000","ロケットナウ":"#FF8C00"};
var CL=["#FFD700","#FF6B00","#FF0055","#00FFFF","#FF00FF","#7FFF00"];
var fd=false,pc=-1,busy=false,expanded=false;
var cs=document.createElement("style");
cs.textContent=
"@keyframes qfpop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.3);opacity:1}100%{transform:scale(1);opacity:1}}"
+"@keyframes qffade{0%,65%{opacity:1}100%{opacity:0;transform:translateY(-50px)}}"
+"@keyframes qfly{0%{opacity:1}100%{transform:translate(var(--px),var(--py)) rotate(var(--pr));opacity:0}}"
+"#qBar{position:fixed;left:0;right:0;z-index:6500;background:rgba(8,15,28,0.98);border-bottom:1px solid rgba(100,200,120,0.2);cursor:pointer;transition:all .3s;user-select:none}"
+"#qBarMain{display:flex;align-items:center;justify-content:space-between;padding:8px 14px}"
+"#qBarLeft{display:flex;align-items:baseline;gap:6px}"
+"#qBarAmt{font-size:20px;font-weight:900;color:#FFD700}"
+"#qBarCnt{font-size:13px;color:#8ab4c8;font-weight:600}"
+"#qBarRight{display:flex;align-items:center;gap:10px;font-size:12px;color:#64748b}"
+"#qBarExpand{transition:transform .3s;color:#4FC3F7;font-size:11px}"
+"#qBarDetail{display:none;padding:8px 14px 10px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch}"
+"#qBarDetail.open{display:flex}"
+"#qBarDetail.closed{display:none}"
+"#qBarDetail span{background:rgba(255,255,255,0.06);border-radius:8px;padding:5px 10px;border:1px solid rgba(255,255,255,0.08);font-size:12px;font-weight:600;color:#b0ccd8;display:inline-flex;align-items:center;gap:3px;flex-shrink:0}"
+"#qBarDetail b{color:#FFD700}"
+"#qBarDetail::-webkit-scrollbar{display:none}"
+"#qDayNightBtn{position:fixed!important;bottom:20px!important;left:14px!important;z-index:8500!important;width:48px!important;height:48px!important;border-radius:50%!important;background:rgba(15,25,45,0.95)!important;border:1px solid rgba(255,255,255,0.2)!important;color:#fff!important;font-size:1.4rem!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 3px 12px rgba(0,0,0,0.4)!important}"
+".qfov{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;pointer-events:none;animation:qffade 4s forwards}"
+".qftx{font-size:2.6rem;font-weight:900;color:#FFD700;text-shadow:0 0 20px #FFD700,0 0 50px #FF8C00;font-family:monospace;letter-spacing:.08em;text-align:center;line-height:1.6;animation:qfpop .5s cubic-bezier(.34,1.56,.64,1) forwards}"
+".qpt{position:fixed;width:10px;height:10px;border-radius:2px;pointer-events:none;z-index:9998;animation:qfly var(--dur) ease-out forwards}";
document.head.appendChild(cs);
var bar=document.createElement("div");bar.id="qBar";
var main=document.createElement("div");main.id="qBarMain";
main.innerHTML='<div id="qBarLeft"><span id="qBarAmt">￥--</span><span id="qBarCnt">-- 件</span></div><div id="qBarRight"><span id="qBarExtra"></span><span id="qBarExpand">▼</span></div>';
var detail=document.createElement("div");detail.id="qBarDetail";detail.className="closed";
bar.appendChild(main);bar.appendChild(detail);
document.body.appendChild(bar);
bar.onclick=function(){expanded=!expanded;detail.className=expanded?"open":"closed";document.getElementById("qBarExpand").textContent=expanded?"▲":"▼";};
var h=new Date().getHours(),isDay=h>=6&&h<18;
var btn=document.createElement("button");btn.id="qDayNightBtn";
btn.textContent=isDay?"🌙":"☀️";
document.documentElement.style.filter=isDay?"brightness(1.2)":"brightness(0.82)";
btn.onclick=function(e){e.stopPropagation();var dy=btn.textContent==="🌙";document.documentElement.style.filter=dy?"brightness(0.82)":"brightness(1.2)";btn.textContent=dy?"☀️":"🌙";};
document.body.appendChild(btn);
function getHdrH(){var best=0;Array.from(document.querySelectorAll("*")).forEach(function(el){if(el===bar||el===btn||bar.contains(el)||btn.contains(el))return;var s=getComputedStyle(el);if(s.position!=="fixed"&&s.position!=="sticky")return;var rc=el.getBoundingClientRect();if(rc.top<10&&rc.height>20&&rc.height<200&&rc.width>100){if(rc.bottom>best)best=rc.bottom;}});return best||62;}
function posBar(){var hh=getHdrH();bar.style.top=hh+"px";var barH=bar.offsetHeight||44;var root=document.getElementById("root");if(root&&!root.dataset.qp){root.style.paddingTop=(hh+barH+2)+"px";root.dataset.qp="1";}}
function fmt(m){return m<60?m+"分":Math.floor(m/60)+"h"+String(m%60).padStart(2,"0")+"m";}
function us(){
if(busy)return;busy=true;
try{
var raw=localStorage.getItem("qt5");if(!raw){busy=false;return;}
var qs=JSON.parse(raw);var now=new Date(),td=0,tr=0,aa=[],el=null;
qs.forEach(function(q){
var dn=q.done||0;td+=dn;
var sp=[].concat(q.bonuses||[]).sort(function(a,b){return a.count-b.count;});
var stepR=sp.filter(function(s){return dn>=s.count;}).reduce(function(s,b){return s+b.reward;},0);
var allDone=sp.length>0&&dn>=(sp[sp.length-1]||{count:999}).count;
var bExtra=allDone?parseInt(q.bonusExtra||0):0;
tr+=stepR+bExtra;
var lg=q.deliveryLog||[];
for(var i=1;i<lg.length;i++){var df=(new Date(lg[i].at)-new Date(lg[i-1].at))/60000;if(df>1&&df<90)aa.push(df);}
if(q.startedAt){var st=new Date(q.startedAt);if(!el||st<el)el=st;}
});
var eh=el?(now-el)/3600000:0;
var hy=(eh>=0.5&&td>=3)?Math.round(tr/eh):0;
var av=aa.length>=3?Math.round(aa.reduce(function(a,b){return a+b;},0)/aa.length):0;
document.getElementById("qBarAmt").textContent="￥"+tr.toLocaleString();
document.getElementById("qBarCnt").textContent=td+"件 稼働";
var extra=hy>0?"￥"+hy.toLocaleString()+"/h":"";
document.getElementById("qBarExtra").textContent=extra;
var det="";
if(eh>=0.1)det+='<span>⏱ <b>'+fmt(Math.round(eh*60))+'</b></span>';
if(hy>0)det+='<span>⚡ <b>￥'+hy.toLocaleString()+'/h</b></span>';
if(av>0)det+='<span>⏰ <b>'+av+'分/件</b></span>';
qs.forEach(function(q){
var dn=q.done||0,gl=q.goal||1;
var sp=[].concat(q.bonuses||[]).sort(function(a,b){return a.count-b.count;});
var rr=sp.filter(function(s){return dn>=s.count;}).reduce(function(s,b){return s+b.reward;},0);
var ad=sp.length>0&&dn>=(sp[sp.length-1]||{count:999}).count;
var bx=ad?parseInt(q.bonusExtra||0):0;
var col=q.service.includes("Uber")?"#00FF00":q.service.includes("ロケ")?"#FF8C00":"#FF0000";
det+='<span style="border-color:'+col+'44">'+q.service.replace("Uber Eats","🐸").replace("出前館","🍣").replace("ロケットナウ","🚀")+' <b>'+dn+'/'+gl+'</b> ￥'+( rr+bx).toLocaleString()+'</span>';
});
if(det!==detail.innerHTML){detail.innerHTML=det;posBar();}
}catch(e){}
busy=false;}
function getC(el){var t=el.innerText||"";if(t.includes("Uber Eats"))return "#00FF00";if(t.includes("出前館"))return "#FF0000";if(t.includes("ロケット"))return "#FF8C00";return "#7B2FBE";}
function applyThemes(){
document.querySelectorAll("button").forEach(function(b){if(b.id==="qDayNightBtn")return;if(b.textContent.trim()==="+"){var c="#7B2FBE";var p=b.parentElement;for(var i=0;i<6;i++){if(p&&parseFloat(getComputedStyle(p).borderLeftWidth)>=3){c=getC(p);break;}p=p&&p.parentElement;}b.style.setProperty("background",c,"important");b.style.setProperty("box-shadow","0 0 18px "+c+"66","important");}});
document.querySelectorAll("div,section").forEach(function(el){if(el===bar)return;if(parseFloat(getComputedStyle(el).borderLeftWidth)<3)return;var c=getC(el);el.style.setProperty("border-color",c,"important");el.style.setProperty("box-shadow","0 0 22px "+c+"33","important");});
}
function fever(){if(fd)return;fd=true;for(var i=0;i<70;i++){(function(j){setTimeout(function(){var p=document.createElement("div");p.className="qpt";p.style.cssText="left:"+Math.random()*100+"vw;top:-10px;background:"+CL[Math.floor(Math.random()*6)]+";--px:"+Math.round((Math.random()-.5)*200)+"px;--py:"+Math.round(60+Math.random()*110)+"vh;--pr:"+Math.round(Math.random()*720)+"deg;--dur:"+(2+Math.random()*1.5).toFixed(1)+"s";document.body.appendChild(p);setTimeout(function(){p.remove();},4000);},j*20);})(i);}var o=document.createElement("div");o.className="qfov";o.innerHTML="<div class='qftx'>🔥 FEVER!! 🔥<br><span style='font-size:1rem;color:#fff;letter-spacing:.2em'>MAX REWARD ACHIEVED!</span></div>";document.body.appendChild(o);setTimeout(function(){o.remove();fd=false;},4500);}
var debT=null;
new MutationObserver(function(muts){
for(var i=0;i<muts.length;i++){if(bar.contains(muts[i].target)||muts[i].target===btn)return;}
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