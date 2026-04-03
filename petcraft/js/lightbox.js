/**
 * PetCraft - Lightbox Module
 * 
 * Handles image gallery lightbox with keyboard navigation and touch support.
 */

let currentIndex = 0;
let images = [];
let lightbox = null;

/**
 * Initialize lightbox functionality
 */
export function initLightbox() {
  // Create lightbox element if it doesn't exist
  createLightbox();
  
  // Get all gallery items
  const galleryItems = document.querySelectorAll('.gallery__item');
  
  if (galleryItems.length === 0) return;
  
  // Build images array
  images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return {
      src: img.dataset.fullSrc || img.src,
      alt: img.alt || ''
    };
  });
  
  // Add click handlers to gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboard);
}

/**
 * Create lightbox DOM element
 */
function createLightbox() {
  if (lightbox) return;
  
  lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox__backdrop"></div>
    <div class="lightbox__content">
      <img src="" alt="" class="lightbox__image">
      <button class="lightbox__close" aria-label="Close lightbox">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button class="lightbox__nav lightbox__nav--next" aria-label="Next image">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  `;
  
  document.body.appendChild(lightbox);
  
  // Add event listeners
  lightbox.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', prevImage);
  lightbox.querySelector('.lightbox__nav--next').addEventListener('click', nextImage);
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  }
}

/**
 * Open lightbox at specific index
 */
export function openLightbox(index) {
  if (!lightbox) return;
  
  currentIndex = index;
  updateLightboxImage();
  lightbox.classList.add('lightbox--open');
  document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
export function closeLightbox() {
  if (!lightbox) return;
  
  lightbox.classList.remove('lightbox--open');
  document.body.style.overflow = '';
}

/**
 * Navigate to next image
 */
export function nextImage() {
  if (images.length === 0) return;
  
  currentIndex = (currentIndex + 1) % images.length;
  updateLightboxImage();
}

/**
 * Navigate to previous image
 */
export function prevImage() {
  if (images.length === 0) return;
  
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

/**
 * Update lightbox image
 */
function updateLightboxImage() {
  if (!lightbox || images.length === 0) return;
  
  const img = lightbox.querySelector('.lightbox__image');
  const image = images[currentIndex];
  
  img.src = image.src;
  img.alt = image.alt;
  
  // Add loading state
  img.style.opacity = '0.5';
  img.onload = () => {
    img.style.opacity = '1';
  };
}

/**
 * Handle keyboard navigation
 */
function handleKeyboard(e) {
  // Only handle if lightbox is open
  if (!lightbox?.classList.contains('lightbox--open')) return;
  
  switch (e.key) {
    case 'ArrowLeft':
      prevImage();
      break;
    case 'ArrowRight':
      nextImage();
      break;
    case 'Escape':
      closeLightbox();
      break;
  }
}