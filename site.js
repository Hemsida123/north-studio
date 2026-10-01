const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu(restoreFocus = false) {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.firstChild.textContent = 'Meny ';
  document.body.classList.remove('menu-open');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  if (isOpen) return closeMenu();
  mobileMenu.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.firstChild.textContent = 'Stäng ';
  document.body.classList.add('menu-open');
});
mobileMenu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (mobileMenu.hidden) return;
  if (event.key === 'Escape') closeMenu(true);
  if (event.key === 'Tab') {
    const links = mobileMenu.querySelectorAll('a');
    if (event.shiftKey && document.activeElement === menuButton) { event.preventDefault(); links[links.length - 1].focus(); }
    else if (!event.shiftKey && document.activeElement === links[links.length - 1]) { event.preventDefault(); menuButton.focus(); }
  }
});
matchMedia('(min-width:701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
