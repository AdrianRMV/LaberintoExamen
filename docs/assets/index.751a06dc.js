var H=Object.defineProperty;var O=(i,n,a)=>n in i?H(i,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[n]=a;var I=(i,n,a)=>(O(i,typeof n!="symbol"?n+"":n,a),a);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function a(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerpolicy&&(d.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?d.credentials="include":o.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function r(o){if(o.ep)return;o.ep=!0;const d=a(o);fetch(o.href,d)}})();let D=document.getElementById("iniciar-btn"),N=document.getElementById("btn-menu"),q=document.getElementById("btn-modal-win"),C=document.getElementById("staticBackdrop"),_=document.getElementById("load"),c=null,s=null,l=null,g=null,v=null,L=[],m=[],u=3.5,F=!1,B=!1,h=0,w=0,U=document.getElementById("segundos"),G=document.getElementById("minutos"),J=document.getElementById("segundos-end"),K=document.getElementById("minutos-end"),k=new Image,A=new Image,z=new Image,Q=new Image,S=new Image,T=new Image,V=new Image,W=new Image;new Image;let M=new Image,b=new Image,X=new Image;new Image;let R=new Image,y=new Audio;new Audio;let E=new Audio;new Audio;let f=new Audio,Y=40,Z=30,x=null;function $(){E.src="./sounds/start.mp3",E.volume=.1,E.play(),_.style.display="block",_.style.opacity="1",setTimeout(e1,2e3)}function e1(){_.style.opacity="0",_.style.display="none",u=3.5,console.log(u),document.getElementById("myDiv").style.display="flex",document.getElementById("board").style.display="flex",i1(),c=document.getElementById("canvas"),s=c.getContext("2d"),c.width=1e3,c.height=1200,R.src="./imgs/floorSkin.png",l=new l1(Y,Z,20,37,3),g=new P(194,163,20,37),M.src="./imgs/witch.png",k.src="./imgs/front.png",A.src="./imgs/right.png",z.src="./imgs/rightDown.png",Q.src="./imgs/rightUp.png",S.src="./imgs/back.png",T.src="./imgs/left.png",V.src="./imgs/leftDown.png",W.src="./imgs/leftUp.png",b.src="./imgs/wallSkin.png",X.src="./imgs/laberinto_vacio.png",f.src="./sounds/pasos.mp3",f.preload="auto",f.volume=.1,y.src="./sounds/ambiental_sound.mp3",y.preload="auto",y.loop=!0,y.volume=.3,y.play(),b.width=20,n1(),j()}const j=()=>{window.requestAnimationFrame(j),x=s.createPattern(R,"repeat"),s.fillStyle=x,s.fillRect(0,0,c.width,c.height),L.map(i=>{i.dibujarImage(i.x,i.y,s,b,i.w,i.h)}),s.drawImage(k,l.x,l.y),s.drawImage(M,g.x,g.y),!B&&!F?t1():(s.fillStyle="rgba(0,0,0,0.5)",s.fillRect(0,0,c.width,c.height),s.fillStyle="#fff",s.font="35px Arial",s.fillText("Pause",425,500))},t1=()=>{m[68]==!0&&(l.x+=u,s.drawImage(A,l.x,l.y),f.play()),m[83]==!0&&(l.y+=u,s.drawImage(k,l.x,l.y),f.play()),m[65]==!0&&(l.x-=u,f.play(),s.drawImage(T,l.x,l.y)),m[87]==!0&&(l.y-=u,l.y<0&&(l.y=700),s.drawImage(S,l.x,l.y),f.play()),l.se_tocan(g)&&(g.width=0,g.height=0,g.x=2e3,g.y=2e3,u=0,J.innerHTML=h,K.innerHTML=w,q.click()),L.map(i=>{l.se_tocan(i)&&(m[87]==!0&&(l.y+=u),m[83]==!0&&(l.y-=u),m[68]==!0&&(l.x-=u),m[65]==!0&&(l.x+=u))})},e=(i,n,a,r)=>{v=new P(i,n,a,r),v.dibujarImage(i,n,s,b,a,r),L.push(v)},t=(i,n)=>n-i,n1=()=>{e(0,0,c.width,20),e(0,c.height-20,c.width,20),e(c.width-20,0,20,c.height),e(0,0,20,c.height),e(20,77,t(20,165),10),e(164,78,10,t(78,195)),e(68,134,t(68,172),10),e(68,139,10,t(139,312)),e(68,311,t(68,165),10),e(163,316,10,t(316,369)),e(70,370,t(70,360),10),e(117,193,10,t(193,252)),e(118,253,t(118,410),10),e(407,76,10,t(76,487)),e(165,188,t(165,263),10),e(209,20,10,t(20,136)),e(212,77,t(212,262),10),e(260,135,10,t(135,193)),e(260,135,t(260,311),10),e(310,79,10,t(79,139)),e(310,196,t(310,360),10),e(357,20,10,t(20,206)),e(408,309,t(408,650),10),e(647,312,10,t(312,489)),e(455,192,t(455,505),10),e(455,77,10,t(77,192)),e(505,251,t(505,555),10),e(550,136,10,t(136,255)),e(552,190,t(552,604),10),e(307,197,10,t(197,257)),e(502,75,t(502,553),10),e(501,20,10,t(20,136)),e(598,75,t(598,652),10),e(598,76,10,t(76,195)),e(601,251,t(601,843),10),e(454,255,10,t(255,314)),e(648,134,t(648,698),10),e(647,134,10,t(134,254)),e(696,191,t(696,845),10),e(696,75,10,t(75,197)),e(696,74,t(695,747),10),e(647,20,10,t(20,80)),e(747,133,t(747,798),10),e(792,20,10,t(20,138)),e(842,133,t(842,943),10),e(841,77,10,t(77,198)),e(939,249,t(939,981),10),e(889,20,10,t(20,78)),e(938,78,10,t(78,138)),e(938,193,10,t(193,256)),e(889,136,10,t(136,313)),e(501,196,10,t(196,257)),e(210,256,10,t(256,311)),e(307,256,10,t(256,311)),e(356,313,10,t(313,374)),e(259,311,10,t(311,490)),e(550,368,10,t(368,666)),e(500,428,10,t(428,548)),e(453,368,10,t(368,429)),e(598,368,10,t(368,429)),e(64,426,10,t(426,841)),e(162,484,10,t(484,898)),e(210,429,10,t(429,490)),e(210,542,10,t(542,608)),e(307,542,10,t(542,608)),e(355,483,10,t(483,608)),e(452,542,10,t(542,608)),e(113,720,10,t(720,782)),e(257,604,10,t(604,667)),e(403,603,10,t(603,725)),e(598,484,10,t(484,725)),e(502,660,10,t(660,839)),e(307,660,10,t(660,900)),e(211,660,10,t(660,842)),e(259,721,10,t(721,842)),e(695,252,10,t(252,312)),e(744,309,10,t(309,373)),e(840,308,10,t(308,608)),e(743,425,10,t(425,608)),e(743,425,10,t(425,608)),e(792,600,10,t(600,725)),e(938,659,10,t(659,724)),e(889,366,10,t(366,547)),e(937,486,10,t(486,609)),e(695,659,10,t(659,784)),e(888,721,10,t(721,784)),e(791,776,10,t(776,842)),e(743,776,10,t(776,900)),e(598,776,10,t(776,1019)),e(694,366,10,t(366,432)),e(647,601,10,t(601,664)),e(452,718,10,t(718,781)),e(356,720,10,t(720,783)),e(112,835,10,t(835,959)),e(210,893,10,t(893,959)),e(356,894,10,t(894,1016)),e(549,838,10,t(838,960)),e(646,717,10,t(717,958)),e(889,835,10,t(835,959)),e(937,951,10,t(951,1015)),e(403,776,10,t(776,901)),e(452,835,10,t(835,901)),e(452,954,10,t(954,1018)),e(501,954,10,t(954,1018)),e(307,1013,10,t(1013,1076)),e(211,1011,10,t(1011,1076)),e(64,954,10,t(954,1018)),e(162,955,10,t(955,1015)),e(113,1011,10,t(1011,1131)),e(64,1071,10,t(1071,1181)),e(355,1069,10,t(1069,1133)),e(307,1128,10,t(1128,1188)),e(500,1128,10,t(1128,1188)),e(646,1128,10,t(1128,1188)),e(549,1070,10,t(1070,1132)),e(404,954,10,t(954,1076)),e(791,425,10,t(425,548)),e(840,717,10,t(717,783)),e(695,953,10,t(953,1014)),e(646,1012,10,t(1012,1075)),e(743,1011,10,t(1011,1075)),e(889,1010,10,t(1010,1075)),e(936,1068,10,t(1068,1135)),e(792,1069,10,t(1069,1135)),e(259,951,10,t(951,1017)),e(841,307,t(841,941),10),e(743,307,t(743,795),10),e(694,366,t(694,844),10),e(890,366,t(890,942),10),e(890,424,t(890,981),10),e(842,599,t(842,941),10),e(745,424,t(745,796),10),e(602,541,t(602,699),10),e(699,484,t(699,747),10),e(456,366,t(456,605),10),e(117,1067,t(117,747),10),e(600,483,t(600,651),10),e(649,600,t(649,796),10),e(794,659,t(794,942),10),e(746,718,t(746,845),10),e(843,775,t(843,983),10),e(795,834,t(795,943),10),e(940,894,t(940,986),10),e(649,951,t(649,941),10),e(699,775,t(699,799),10),e(650,834,t(650,700),10),e(698,659,t(698,748),10),e(552,717,t(552,651),10),e(504,775,t(504,603),10),e(310,425,t(310,410),10),e(263,483,t(263,362),10),e(359,542,t(359,458),10),e(409,483,t(409,503),10),e(67,425,t(67,167),10),e(212,542,t(212,312),10),e(115,484,t(115,215),10),e(115,600,t(115,215),10),e(67,542,t(67,117),10),e(67,658,t(67,117),10),e(67,834,t(67,117),10),e(117,775,t(117,167),10),e(212,659,t(212,407),10),e(457,600,t(457,552),10),e(457,659,t(457,552),10),e(17,893,t(17,116),10),e(17,893,t(17,116),10),e(115,951,t(115,214),10),e(213,892,t(213,310),10),e(213,834,t(213,264),10),e(310,834,t(310,360),10),e(360,776,t(360,409),10),e(408,716,t(408,457),10),e(456,892,t(456,552),10),e(261,951,t(261,360),10),e(67,1010,t(67,118),10),e(214,1010,t(214,264),10),e(455,1010,t(455,505),10),e(553,1010,t(553,650),10),e(407,833,t(407,457),10),e(504,951,t(504,553),10),e(697,893,t(697,844),10),e(746,1010,t(746,893),10),e(696,1127,t(696,941),10),e(892,1068,t(892,939),10),e(795,1068,t(795,845),10),e(599,1127,t(599,650),10),e(405,1127,t(405,505),10),e(164,1127,t(164,311),10)},i1=(i=1e3)=>{window.setInterval(function(){h==60&&(h=0,w++,G.innerHTML=w,w===0&&(w=0)),U.innerHTML=h,h+=1},i)};class P{constructor(n,a,r,o){I(this,"dibujar",function(n){n.fillRect(this.x,this.y,this.w,this.h),n.strokeRect(this.x,this.y,this.w,this.h)});I(this,"dibujarImage",function(n,a,r,o,d,p){x=r.createPattern(o,"repeat"),r.beginPath(),r.fillStyle=x,r.fillRect(n,a,d,p),r.closePath()});I(this,"se_tocan",function(n){if(this.x<n.x+n.w&&this.x+this.w>n.x&&this.y<n.y+n.h&&this.y+this.h>n.y)return!0});this.x=n,this.y=a,this.w=r,this.h=o}}class l1 extends P{constructor(n,a,r,o,d){super(n,a,r,o),this.lifes=d}}document.addEventListener("keydown",({keyCode:i})=>{i==32&&(B=!B)});document.addEventListener("keydown",function({keyCode:i}){m[i]=!0});document.addEventListener("keyup",function({keyCode:i}){m[i]=!1});D.addEventListener("click",()=>{C.style.display="none",N.style.display="none",$()});
