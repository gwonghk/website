/**
 * PetCraft - Parallax Module
 * 
 * Handles parallax scrolling effects.
 */

let ticking = false;

/**
 * Initialize parallax effects
 */
export function initParallax() {
  if (!SITE_CONFIG.features.parallax) return;
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  // Initialize parallax elements
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.5;
    el.style.willChange = 'transform';
  });
  
  // Handle scroll
  window.addEventListener('scroll', handleParallax, { passive: true });
}

/**
 * Handle parallax scroll
 */
function handleParallax() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
}

/**
 * Update parallax positions
 */
function updateParallax() {
  const scrollTop = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const speed = parseFloat(el.dataset.parallax) || 0.5;
    
    // Calculate if element is in viewport
    const inViewport = (
      rect.bottom > 0 &&
      rect.top < window.innerHeight
    );
    
    if (inViewport) {
      // Calculate parallax offset
      const offset = (rect.top - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    }
  });
}

/**
 * Parallax for hero background
 */
export function initHeroParallax() {
  const heroBg = document.querySelector('.hero__background');
  
  if (!heroBg) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    // Only apply parallax when hero is visible
    if (scrollTop < heroHeight) {
      const offset = scrollTop * 0.3;
      heroBg.style.transform = `translateY(${offset}px)`;
    }
  }, { passive: true });
}