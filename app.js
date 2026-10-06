const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-nav');
const desktop = window.matchMedia('(min-width: 1201px)');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 90); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('span').textContent = open ? 'Cerrar' : 'Menú';
  menu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  document.querySelectorAll('main, footer, .site-header > .identity, .header-contact, .skip-link').forEach(el => { el.inert = open; });
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', e => {
  const link = e.target.closest('a');
  if (!link) return;
  setMenu(false);
  const target = document.querySelector(link.getAttribute('href'));
  if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
});
document.addEventListener('keydown', e => {
  if (toggle.getAttribute('aria-expanded') !== 'true') return;
  if (e.key === 'Escape') { setMenu(false); toggle.focus(); }
  if (e.key !== 'Tab') return;
  const focusable = [toggle, ...menu.querySelectorAll('a')];
  const first = focusable[0], last = focusable.at(-1);
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
desktop.addEventListener('change', e => { if (e.matches) setMenu(false); });

if (!motion.matches && 'IntersectionObserver' in window) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  motion.addEventListener('change', () => { document.body.classList.remove('motion-ready'); observer.disconnect(); }, { once: true });
}

// Only scroll/user-triggered motion: no perpetual animation loop or scroll hijacking.
const scenes = new Set();
const readingProgress = document.querySelector('.reading-progress');
let scrollFrame = 0;
const sceneObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) scenes.add(entry.target); else scenes.delete(entry.target);
  }
  scheduleScroll();
}, { rootMargin: '100px 0px', threshold: 0 });
document.querySelectorAll('.hero, .kinetic-bridge, .image-frame').forEach(el => sceneObserver.observe(el));
function renderScroll() {
  scrollFrame = 0;
  const extent = document.documentElement.scrollHeight - innerHeight;
  readingProgress.style.setProperty('--reading', String(extent > 0 ? window.scrollY / extent : 0));
  if (motion.matches) return;
  for (const scene of scenes) {
    const rect = scene.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
    if (scene.classList.contains('hero')) {
      scene.style.setProperty('--hero-depth', `${Math.min(20, window.scrollY * .045).toFixed(1)}px`);
      scene.style.setProperty('--seal-angle', `${(-12 + progress * 75).toFixed(1)}deg`);
    } else if (scene.classList.contains('kinetic-bridge')) {
      scene.style.setProperty('--bridge-shift', `${(-6 + progress * 8).toFixed(2)}vw`);
    } else {
      scene.style.setProperty('--image-depth', `${((progress - .5) * 18).toFixed(1)}px`);
    }
  }
}
function scheduleScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(renderScroll); }
window.addEventListener('scroll', scheduleScroll, { passive: true });
window.addEventListener('resize', scheduleScroll, { passive: true });
motion.addEventListener('change', scheduleScroll);
scheduleScroll();

const videoDialog = document.querySelector('#video-dialog');
const videoPlayer = document.querySelector('#video-player');
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && videoDialog.open && !document.fullscreenElement) {
    event.preventDefault();
    videoDialog.close();
  }
}, { capture: true });
document.querySelectorAll('[data-video]').forEach(link => link.addEventListener('click', event => {
  if (!videoDialog || typeof videoDialog.showModal !== 'function') return;
  event.preventDefault();
  const article = link.closest('article');
  const title = `${article.querySelector('.video-caption-row').textContent.trim().replace(/^\d+ \/ /, '')} · ${article.querySelector('h3').textContent}`;
  document.querySelector('#video-dialog-title').textContent = title;
  document.querySelector('#video-dialog-description').textContent = article.querySelector(':scope > p').textContent;
  videoPlayer.setAttribute('aria-label', title);
  videoPlayer.poster = article.querySelector('img').src;
  videoPlayer.src = link.getAttribute('href');
  videoPlayer.querySelectorAll('track').forEach(track => track.remove());
  const captions = document.createElement('track');
  captions.kind = 'captions'; captions.srclang = 'es'; captions.label = 'Español';
  captions.src = link.getAttribute('href').replace('.mp4', '.es.vtt');
  videoPlayer.append(captions);
  videoDialog.showModal();
  // Playback is requested explicitly by the user's click, never by page load.
  videoPlayer.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
}));
videoDialog.addEventListener('close', () => {
  videoPlayer.pause();
  videoPlayer.removeAttribute('src');
  videoPlayer.querySelectorAll('track').forEach(track => track.remove());
  videoPlayer.load();
});

document.querySelector('[data-open-contact]').addEventListener('click', () => document.querySelector('#contact-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('.dialog-close, .dialog-dismiss').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
});
const legal = {
  legal: ['Información legal', 'Propuesta de diseño no publicada. El aviso legal definitivo requiere los datos fiscales y de identificación del titular, que todavía no han sido facilitados.'],
  privacidad: ['Privacidad', 'Esta propuesta no contiene formularios de recogida de datos, analítica ni seguimiento. La política definitiva se redactará cuando estén confirmados el titular, los canales de contacto y el tratamiento de datos.'],
  cookies: ['Cookies', 'Esta propuesta no instala cookies ni utiliza almacenamiento local, analítica o reproductores externos. Las fuentes y las imágenes se sirven localmente. No es necesario un banner de consentimiento en esta fase.']
};
document.querySelectorAll('[data-legal]').forEach(button => button.addEventListener('click', () => {
  const [title, copy] = legal[button.dataset.legal];
  document.querySelector('#legal-dialog-title').textContent = title;
  document.querySelector('#legal-dialog-copy').textContent = copy;
  document.querySelector('#legal-dialog').showModal();
}));
