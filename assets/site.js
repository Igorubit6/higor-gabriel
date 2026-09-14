(() => {
  const DESKTOP = 960;

  // menu sanduíche (celular)
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    const setOpen = open => {
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('menu-open', open);
    };
    burger.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    addEventListener('resize', () => { if (innerWidth >= DESKTOP) setOpen(false); });
  }

  // dropdown "Projetos" (desktop)
  document.querySelectorAll('.dd').forEach(dd => {
    const btn = dd.querySelector('.dd-btn');
    const setOpen = open => { dd.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); };
    btn.addEventListener('click', () => setOpen(!dd.classList.contains('open')));
    document.addEventListener('click', e => { if (!dd.contains(e.target)) setOpen(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  });

  // ampliar prints de resultados
  const lb = document.getElementById('lb');
  if (lb) {
    const lbImg = lb.querySelector('img');
    document.querySelectorAll('.proof-img').forEach(b => b.addEventListener('click', () => {
      const i = b.querySelector('img');
      lbImg.src = i.src; lbImg.alt = i.alt; lb.hidden = false;
    }));
    lb.addEventListener('click', () => { lb.hidden = true; });
    addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });
  }

  // animação de entrada
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
