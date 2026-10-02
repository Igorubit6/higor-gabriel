const hero=document.querySelector('.hero');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let heroVisible=true;
const heroVideo=document.querySelector('.hero-video');
if(heroVideo){
 heroVideo.muted=true;
 heroVideo.addEventListener('playing',()=>heroVideo.parentElement.classList.add('video-ready'));
 heroVideo.addEventListener('error',()=>heroVideo.parentElement.classList.remove('video-ready'));
}

function syncAmbientMotion(){
  const paused=reduce.matches||document.hidden||!heroVisible;
  document.body.classList.toggle('ambient-paused',paused);
  if(heroVideo){if(paused){heroVideo.pause();}else{heroVideo.play().catch(()=>{});}}
}

if(hero&&'IntersectionObserver'in window){
  new IntersectionObserver(([entry])=>{
    heroVisible=entry.isIntersecting;
    syncAmbientMotion();
  },{threshold:.05}).observe(hero);
}

document.addEventListener('visibilitychange',syncAmbientMotion);
reduce.addEventListener('change',syncAmbientMotion);
syncAmbientMotion();
