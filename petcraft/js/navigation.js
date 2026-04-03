/**
 * PetCraft - Navigation Module
 * 
 * Handles header scroll behavior, mobile menu, and sticky navigation.
 */

let lastScrollTop = 0;
let scrollThreshold = 100;

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  
  if (!header) return;
  
  // Handle scroll behavior
  handleScroll(header);
  window.addEventListener('scroll', () => handleScroll(header), { passive: true });
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => openMobileMenu());
  }
  
  // Mobile menu close
  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => closeMobileMenu());
  }
  
  // Mobile menu overlay click to close
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', () => closeMobileMenu());
  }
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
  
  // Close menu on window resize (if larger than mobile breakpoint)
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  }, 250));
  
  // Set active nav link based on current page
  setActiveNavLink();
}

/**
 * Handle header scroll behavior
 */
function handleScroll(header) {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add/remove scrolled class
  if (scrollTop > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
  
  // Hide/show header based on scroll direction
  if (SITE_CONFIG.features.stickyHeader) {
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      // Scrolling down
      header.classList.add('header--hidden');
    } else {
      // Scrolling up
      header.classList.remove('header--hidden');
    }
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  
  if (mobileNav) {
    mobileNav.classList.add('mobile-nav--open');
    document.body.classList.add('mobile-nav-open');
  }
  
  if (mobileNavOverlay) {
    mobileNavOverlay.classList.add('mobile-nav-overlay--visible');
  }
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

/**
 * Close mobile menu
 */
export function closeMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  
  if (mobileNav) {
    mobileNav.classList.remove('mobile-nav--open');
  }
  
  if (mobileNavOverlay) {
    mobileNavOverlay.classList.remove('mobile-nav-overlay--visible');
  }
  
  document.body.classList.remove('mobile-nav-open');
  document.body.style.overflow = '';
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if current path matches link path
    if (currentPath.endsWith(linkPath) || 
        (currentPath === '/' && (linkPath === 'index.html' || linkPath === '/'))) {
      link.classList.add('nav__link--active', 'mobile-nav__link--active');
    }
  });
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
