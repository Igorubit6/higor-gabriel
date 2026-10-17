(() => {
  // botão flutuante: aparece depois do topo e some perto do fim (chamada final e rodapé)
  const wa = document.querySelector('.nwa'); if (!wa) return;
  const topo = document.querySelector('.nicho-hero');
  const fim = [...document.querySelectorAll('.final, .nf')];
  let passou = false; const vis = new Set();
  const sync = () => wa.classList.toggle('is-hidden', !passou || vis.size > 0);
  if ('IntersectionObserver' in window) {
    if (topo) new IntersectionObserver(([e]) => { passou = !e.isIntersecting; sync(); }).observe(topo);
    const io = new IntersectionObserver(es => es.forEach(e => { e.isIntersecting ? vis.add(e.target) : vis.delete(e.target); sync(); }));
    fim.forEach(el => io.observe(el));
  }
  sync();
})();
