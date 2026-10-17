(() => {
  const DESKTOP = 960;
  const header = document.querySelector('.gh-header');
  const burger = document.querySelector('.gh-burger');
  const menu = document.getElementById('gh-menu');

  if (burger && menu) {
    const setOpen = open => {
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('gh-menu-open', open);
    };
    burger.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    addEventListener('resize', () => { if (innerWidth >= DESKTOP) setOpen(false); });
  }

  document.querySelectorAll('.gh-dd').forEach(dd => {
    const btn = dd.querySelector('.gh-dd-btn');
    const setOpen = open => { dd.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', () => setOpen(!dd.classList.contains('open')));
    document.addEventListener('click', e => { if (!dd.contains(e.target)) setOpen(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  });

  // cabeçalho mais sólido após rolar
  const onScroll = () => header && header.classList.toggle('is-scrolled', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // WhatsApp flutuante: só depois do primeiro bloco e fora do CTA final/rodapé
  const wa = document.querySelector('.gh-wa');
  if (wa && 'IntersectionObserver' in window) {
    const first = document.querySelector('main > :first-child');
    const ends = [...document.querySelectorAll('[data-hide-wa], .gh-footer')];
    let pastFirst = false; const endVisible = new Set();
    const sync = () => wa.classList.toggle('show', pastFirst && endVisible.size === 0);
    if (first) new IntersectionObserver(([e]) => { pastFirst = !e.isIntersecting; sync(); }, { threshold: 0 }).observe(first);
    else pastFirst = true;
    const io = new IntersectionObserver(es => es.forEach(e => { e.isIntersecting ? endVisible.add(e.target) : endVisible.delete(e.target); sync(); }), { threshold: 0 });
    ends.forEach(el => io.observe(el));
    sync();
  } else if (wa) wa.classList.add('show');

  // no celular, esconde o WhatsApp enquanto a pessoa rola para baixo lendo; volta ao rolar para cima
  if (wa) {
    let lastY = scrollY;
    addEventListener('scroll', () => {
      if (innerWidth > 760) { wa.classList.remove('is-hidden-scroll'); return; }
      const y = scrollY, down = y > lastY + 4, up = y < lastY - 4;
      if (down) wa.classList.add('is-hidden-scroll');
      else if (up || y === 0) wa.classList.remove('is-hidden-scroll');
      if (down || up) lastY = y;
    }, { passive: true });
  }
})();
