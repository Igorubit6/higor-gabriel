(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!reduce&&'IntersectionObserver' in window){document.documentElement.classList.add('js-motion');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.07});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}
 // menu agora fica em shell.js
 const planTabs=[...document.querySelectorAll('[data-plan-tab]')],planPanels=[...document.querySelectorAll('[data-plan-panel]')];
 function showPlan(step,focus=false){planTabs.forEach(tab=>{const selected=+tab.dataset.planTab===step;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;if(selected&&focus)tab.focus()});planPanels.forEach(panel=>panel.hidden=+panel.dataset.planPanel!==step)}
 planTabs.forEach(tab=>{tab.addEventListener('click',()=>showPlan(+tab.dataset.planTab));tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const current=+tab.dataset.planTab;const next=event.key==='Home'?1:event.key==='End'?3:event.key==='ArrowRight'?current%3+1:(current+1)%3+1;showPlan(next,true)})});
 document.querySelectorAll('[data-plan-next]').forEach(button=>button.addEventListener('click',()=>showPlan(+button.dataset.planNext,true)));
})();
