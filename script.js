/* ========================================
   ESPACIO MAT - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const menuToggle = document.getElementById('menuToggle');
  const navMobile = document.getElementById('navMobile');
  const menuIcon = menuToggle.querySelector('.menu-icon');
  const closeIcon = menuToggle.querySelector('.close-icon');
  
  menuToggle.addEventListener('click', function() {
    const isOpen = !navMobile.classList.contains('hidden');
    
    if (isOpen) {
      navMobile.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      navMobile.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMobile.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
  
  // ========================================
  // Header Scroll Effect
  // ========================================
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========================================
  // Fade In Animation on Scroll
  // ========================================
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const fadeObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });
  
  // ========================================
  // Servicios Accordion
  // ========================================
  const servicioItems = document.querySelectorAll('.servicio-item');
  
  servicioItems.forEach(item => {
    const header = item.querySelector('.servicio-header');
    
    header.addEventListener('click', function() {
      const isOpen = item.classList.contains('open');
      
      // Close all other items
      servicioItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
        }
      });
      
      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
  
  // ========================================
  // Initial Animation for Hero
  // ========================================
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('visible');
    }, 100);
  }

});

// ========================================
// Galería - Carrusel con flechas (sin autoplay)
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const galeriaTrack = document.getElementById('galeriaTrack');
  const galeriaPrev = document.getElementById('galeriaPrev');
  const galeriaNext = document.getElementById('galeriaNext');

  if (galeriaTrack && galeriaPrev && galeriaNext) {
    function galeriaScrollStep() {
      const item = galeriaTrack.querySelector('.galeria-item');
      if (!item) return 320;
      const gap = parseInt(getComputedStyle(galeriaTrack).gap) || 0;
      return item.offsetWidth + gap;
    }

    function updateGaleriaArrows() {
      const maxScroll = galeriaTrack.scrollWidth - galeriaTrack.clientWidth;
      galeriaPrev.style.opacity = galeriaTrack.scrollLeft <= 0 ? '0.4' : '1';
      galeriaPrev.style.pointerEvents = galeriaTrack.scrollLeft <= 0 ? 'none' : 'auto';
      galeriaNext.style.opacity = galeriaTrack.scrollLeft >= maxScroll - 1 ? '0.4' : '1';
      galeriaNext.style.pointerEvents = galeriaTrack.scrollLeft >= maxScroll - 1 ? 'none' : 'auto';
    }

    galeriaNext.addEventListener('click', function () {
      galeriaTrack.scrollBy({ left: galeriaScrollStep(), behavior: 'smooth' });
    });

    galeriaPrev.addEventListener('click', function () {
      galeriaTrack.scrollBy({ left: -galeriaScrollStep(), behavior: 'smooth' });
    });

    galeriaTrack.addEventListener('scroll', updateGaleriaArrows);
    updateGaleriaArrows();
  }
});


// ========================================
// Galería - Carrusel infinito (sin trabas) + zoom en hover (CSS)
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const track = document.getElementById('galeriaTrack');
  const prevBtn = document.getElementById('galeriaPrev');
  const nextBtn = document.getElementById('galeriaNext');

  if (track && prevBtn && nextBtn) {
    const originals = Array.from(track.children);
    const count = originals.length;

    // Clonamos las fotos una sola vez: una copia antes y otra después,
    // así el carrusel puede "dar la vuelta" sin reordenar nada en cada click.
    originals.slice().reverse().forEach(function (el) {
      track.insertBefore(el.cloneNode(true), track.firstElementChild);
    });
    originals.forEach(function (el) {
      track.appendChild(el.cloneNode(true));
    });

    let index = count; // arranca mostrando la primera foto "real"
    let isAnimating = false;

    function stepWidth() {
      const item = track.children[0];
      const gap = parseInt(getComputedStyle(track).gap) || 0;
      return item.getBoundingClientRect().width + gap;
    }

    function goTo(i, instant) {
      if (instant) track.classList.add('no-transition');
      track.style.transform = 'translateX(-' + (i * stepWidth()) + 'px)';
      if (instant) {
        void track.offsetWidth; // fuerza el reflow antes de reactivar la transición
        track.classList.remove('no-transition');
      }
    }

    // posiciona el carrusel al cargar, sin animación
    goTo(index, true);

    track.addEventListener('transitionend', function () {
      // si llegamos a la zona clonada del final, saltamos al original equivalente
      if (index >= count * 2) {
        index -= count;
        goTo(index, true);
      }
      // si llegamos a la zona clonada del principio, saltamos al original equivalente
      else if (index < count) {
        index += count;
        goTo(index, true);
      }
      isAnimating = false;
    });

    nextBtn.addEventListener('click', function () {
      if (isAnimating) return;
      isAnimating = true;
      index++;
      goTo(index, false);
    });

    prevBtn.addEventListener('click', function () {
      if (isAnimating) return;
      isAnimating = true;
      index--;
      goTo(index, false);
    });

    window.addEventListener('resize', function () {
      goTo(index, true);
    });
  }
});

const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

document.querySelectorAll("a, button, .galeria-item").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.width = "32px";
        cursor.style.height = "32px";
    });

    el.addEventListener("mouseleave", () => {
        cursor.style.width = "26px";
        cursor.style.height = "26px";
    });
});