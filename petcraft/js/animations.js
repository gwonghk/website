/**
 * PetCraft - Scroll Animations Module
 * 
 * Handles scroll-triggered animations for elements.
 */

/**
 * Initialize scroll animations
 */
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  if (animatedElements.length === 0) return;
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Show all elements immediately without animation
    animatedElements.forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optionally unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all elements
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Animate element with specific animation
 */
export function animate(element, animation, duration = 600) {
  return new Promise(resolve => {
    element.style.animation = `${animation} ${duration}ms ease forwards`;
    
    setTimeout(() => {
      element.style.animation = '';
      resolve();
    }, duration);
  });
}

/**
 * Stagger animation for multiple elements
 */
export function staggerAnimate(elements, animation, delay = 100) {
  return new Promise(resolve => {
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animation = `${animation} 600ms ease forwards`;
      }, index * delay);
    });
    
    setTimeout(resolve, elements.length * delay + 600);
  });
}