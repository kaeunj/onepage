(function () {
  const header = document.querySelector('header');
  const gotoTop = document.querySelector('.goto-top');

  if (!header) return;

  function updateHeader() {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    header.classList.toggle('is-scrolled', scrollY > 40);
    header.classList.toggle('is-past-hero', scrollY > heroHeight * 0.75);

    if (gotoTop) {
      gotoTop.classList.toggle('is-visible', scrollY > 40);
    }
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
})();
