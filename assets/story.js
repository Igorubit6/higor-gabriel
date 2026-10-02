const hero=document.querySelector('.hero');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo=document.querySelector('.hero-video');
const playButton=document.querySelector('.hero-play');
let heroVisible=true;
let playPending=false;
let userRequested=false;
function paused(){return document.hidden||!heroVisible||(reduce.matches&&!userRequested);}
function syncAmbientMotion(){
 document.body.classList.toggle('ambient-paused',paused());
 if(!heroVideo)return;
 if(paused()){heroVideo.pause();if(reduce.matches&&!userRequested)playButton.hidden=false;return;}
 if(playPending||!heroVideo.paused)return;
 playPending=true;
 heroVideo.play().then(()=>{playButton.hidden=true;}).catch(()=>{playButton.hidden=false;}).finally(()=>{playPending=false;});
}
if(heroVideo){
 heroVideo.muted=true;heroVideo.defaultMuted=true;
 heroVideo.addEventListener('playing',()=>{heroVideo.parentElement.classList.add('video-ready');playButton.hidden=true;});
 heroVideo.addEventListener('error',()=>{heroVideo.parentElement.classList.remove('video-ready');playButton.hidden=true;});
 heroVideo.addEventListener('canplay',syncAmbientMotion);
 playButton.addEventListener('click',()=>{userRequested=true;heroVideo.classList.add('user-requested');syncAmbientMotion();});
 document.addEventListener('pointerdown',()=>{if(!reduce.matches)syncAmbientMotion();},{passive:true});
}
if(hero&&'IntersectionObserver'in window){new IntersectionObserver(([entry])=>{heroVisible=entry.isIntersecting;syncAmbientMotion();},{threshold:.05}).observe(hero);}
document.addEventListener('visibilitychange',syncAmbientMotion);
window.addEventListener('pageshow',syncAmbientMotion);
reduce.addEventListener('change',()=>{userRequested=false;heroVideo?.classList.remove('user-requested');syncAmbientMotion();});
syncAmbientMotion();
