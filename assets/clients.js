(() => {
  const section = document.querySelector('.client-section');
  if (!section) return;
  const track = section.querySelector('.client-track');
  const list = section.querySelector('.client-list');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let inView = false;
  let clone;
  const sync = () => section.classList.toggle('is-running', inView && !document.hidden && !reduced.matches);
  const measure = () => track.style.setProperty('--client-duration', `${list.getBoundingClientRect().width / 30}s`);
  function configure() {
    if (reduced.matches) {
      clone?.remove();
      clone = null;
      section.classList.remove('is-animated');
    } else {
      if (!clone) {
        clone = list.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('inert', '');
        clone.removeAttribute('aria-label');
        clone.dataset.clientClone = '';
        clone.querySelectorAll('a').forEach(link => link.tabIndex = -1);
        track.append(clone);
      }
      section.classList.add('is-animated');
      measure();
    }
    sync();
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      // Load the whole small logo set before it travels into view.
      if (inView) section.querySelectorAll('img').forEach(image => image.loading = 'eager');
      sync();
    }).observe(section);
  } else inView = true;
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(list);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', configure);
  configure();
})();
