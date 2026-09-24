const hero=document.querySelector('.hero');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let heroVisible=true;

function syncAmbientMotion(){
  document.body.classList.toggle('ambient-paused',reduce.matches||document.hidden||!heroVisible);
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
