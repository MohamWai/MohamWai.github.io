(function () {
  'use strict';

  // Smooth scroll for nav links (respects prefers-reduced-motion)
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        var id = href.slice(1);
        var target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        }
      }
    });
  });

  // Nav highlight: add class to nav link when its section is in view
  var sections = document.querySelectorAll('.section, .hero');
  var sectionIds = [];
  sections.forEach(function (section) {
    var id = section.getAttribute('id');
    if (id) sectionIds.push(id);
  });

  function updateActiveNav() {
    var scrollY = window.scrollY || window.pageYOffset;
    var viewportMid = scrollY + window.innerHeight * 0.35;

    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      var link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (!section || !link) return;

      var top = section.offsetTop;
      var height = section.offsetHeight;
      var inView = viewportMid >= top && viewportMid < top + height;

      if (inView) {
        link.setAttribute('aria-current', 'true');
        link.classList.add('nav-link-active');
      } else {
        link.removeAttribute('aria-current');
        link.classList.remove('nav-link-active');
      }
    });
  }

  if (sectionIds.length > 0) {
    window.addEventListener('scroll', function () {
      requestAnimationFrame(updateActiveNav);
    });
    updateActiveNav();
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
