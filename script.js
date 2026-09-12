const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const sections = [...document.querySelectorAll('main section[id], footer[id]')];
const menuBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');
const themeBtn = document.querySelector('.theme-toggle');

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
  const y = window.scrollY + 120;
  let current = '#top';
  sections.forEach(s => { if (s.offsetTop <= y) current = '#' + s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === current || (current === '#contact' && a.getAttribute('href') === '#contact')));
};
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

menuBtn.addEventListener('click', () => {
  const open = menu.hasAttribute('hidden');
  if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden','');
  menuBtn.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.setAttribute('hidden',''); menuBtn.setAttribute('aria-expanded','false'); }));

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('alt-theme');
  themeBtn.textContent = document.body.classList.contains('alt-theme') ? '☾' : '☼';
});

const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
