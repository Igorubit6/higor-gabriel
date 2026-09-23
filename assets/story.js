const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const scenes=[...document.querySelectorAll('.hero,.qualification,.strategy')];
let pending=false;
function paint(){pending=false;for(const scene of scenes){const r=scene.getBoundingClientRect();const progress=Math.max(-1,Math.min(1,(innerHeight*.5-r.top-r.height*.5)/innerHeight));scene.style.setProperty('--story-y',reduce.matches?'0px':`${progress*(innerWidth<761?24:65)}px`);scene.style.setProperty('--story-turn',reduce.matches?'0deg':`${progress*2}deg`);}}
function schedule(){if(!pending){pending=true;requestAnimationFrame(paint)}}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduce.addEventListener('change',schedule);paint();
