(function () {
  const SLIDE_INTERVAL = 6000;
  const slider = document.querySelector('.hero-slider');

  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = slider.querySelectorAll('.hero-dot');
  let current = 0;
  let timer = null;
  let paused = false;

  function goTo(index) {
    if (index === current || index < 0 || index >= slides.length) return;

    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-current', 'false');

    current = index;

    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-current', 'true');

    restartKenBurns(slides[current]);
  }

  function restartKenBurns(slide) {
    const img = slide.querySelector('.hero-slide__media img');
    if (!img) return;

    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = '';
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function startAutoplay() {
    stopAutoplay();
    if (!paused) {
      timer = setInterval(next, SLIDE_INTERVAL);
    }
  }

  function stopAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      goTo(index);
      startAutoplay();
    });
  });

  slider.addEventListener('mouseenter', function () {
    paused = true;
    stopAutoplay();
  });

  slider.addEventListener('mouseleave', function () {
    paused = false;
    startAutoplay();
  });

  startAutoplay();
})();
