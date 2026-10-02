const hero=document.querySelector('.hero');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo=document.querySelector('.hero-video');
let heroVisible=true;
let playPending=false;
function paused(){return document.hidden||!heroVisible||reduce.matches;}
function showPoster(){heroVideo?.parentElement.classList.remove('video-ready');}
function syncAmbientMotion(){
 document.body.classList.toggle('ambient-paused',paused());
 if(!heroVideo)return;
 if(paused()){heroVideo.pause();if(reduce.matches)showPoster();return;}
 if(playPending||!heroVideo.paused)return;
 playPending=true;
 heroVideo.play().then(()=>{if(paused()){heroVideo.pause();if(reduce.matches)showPoster();}}).catch(showPoster).finally(()=>{playPending=false;});
}
if(heroVideo){
 heroVideo.muted=true;heroVideo.defaultMuted=true;
 heroVideo.addEventListener('playing',()=>{if(!paused())heroVideo.parentElement.classList.add('video-ready');});
 heroVideo.addEventListener('error',showPoster);
 heroVideo.querySelector('source')?.addEventListener('error',showPoster);
 heroVideo.addEventListener('canplay',syncAmbientMotion);
 document.addEventListener('pointerdown',syncAmbientMotion,{passive:true});
}
if(hero&&'IntersectionObserver'in window){new IntersectionObserver(([entry])=>{heroVisible=entry.isIntersecting;syncAmbientMotion();},{threshold:.05}).observe(hero);}
document.addEventListener('visibilitychange',syncAmbientMotion);
window.addEventListener('pageshow',syncAmbientMotion);
reduce.addEventListener('change',syncAmbientMotion);
syncAmbientMotion();
