/**
 * PetCraft - Main JavaScript Entry Point
 * 
 * This file initializes all modules and handles global functionality.
 */

import { initNavigation } from './navigation.js';
import { initDarkMode } from './dark-mode.js';
import { initLightbox } from './lightbox.js';
import { initInstagramFeed } from './instagram.js';
import { initNewsletter } from './newsletter.js';
import { initScrollAnimations } from './animations.js';
import { initParallax } from './parallax.js';

/**
 * Initialize all modules when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log(`Welcome to ${SITE_CONFIG.brand} - ${SITE_CONFIG.tagline}`);
  
  // Initialize all modules
  initNavigation();
  initDarkMode();
  initLightbox();
  initInstagramFeed();
  initNewsletter();
  initScrollAnimations();
  initParallax();
  
  // Mark page as loaded
  document.body.classList.add('is-loaded');
});

/**
 * Handle lazy loading of images
 */
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
});

/**
 * Smooth scroll to anchor links
 */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  
  if (link) {
    const targetId = link.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      document.body.classList.remove('mobile-nav-open');
      document.querySelector('.mobile-nav')?.classList.remove('mobile-nav--open');
      document.querySelector('.mobile-nav-overlay')?.classList.remove('mobile-nav-overlay--visible');
    }
  }
});

/**
 * Handle keyboard navigation
 */
document.addEventListener('keydown', (e) => {
  // ESC to close modals/lightboxes
  if (e.key === 'Escape') {
    document.querySelector('.lightbox')?.classList.remove('lightbox--open');
    document.querySelector('.mobile-nav')?.classList.remove('mobile-nav--open');
    document.querySelector('.mobile-nav-overlay')?.classList.remove('mobile-nav-overlay--visible');
    document.body.classList.remove('mobile-nav-open');
  }
});

/**
 * Expose SITE_CONFIG globally for debugging
 */
window.SITE_CONFIG = SITE_CONFIG;
