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
  // Contact Form Handling
  // ========================================
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Here you would typically send the data to your server
    // For now, we'll just show a success message
    console.log('Form submitted:', data);
    
    // Show success feedback
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
      ¡Mensaje enviado!
    `;
    submitBtn.style.background = 'var(--mat-green)';
    submitBtn.disabled = true;
    
    // Reset form and button after delay
    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
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
  
  // ========================================
  // Custom Cursor
  // ========================================
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Track mouse position
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor animation
  function animateCursor() {
    const speed = 0.15;
    
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .servicio-header');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', function() {
      document.body.classList.remove('cursor-hover');
    });
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', function() {
    cursor.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', function() {
    cursor.style.opacity = '1';
  });
  
});
