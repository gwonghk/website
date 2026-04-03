/**
 * PetCraft - Dark Mode Module
 * 
 * Handles theme toggle, localStorage persistence, and system preference detection.
 */

const THEME_STORAGE_KEY = 'petcraft-theme';

/**
 * Initialize dark mode functionality
 */
export function initDarkMode() {
  if (!SITE_CONFIG.features.darkMode) return;
  
  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
  
  // Initialize theme toggle button
  initThemeToggle();
}

/**
 * Initialize theme toggle button click handler
 */
function initThemeToggle() {
  const toggleButton = document.querySelector('.theme-toggle');
  
  if (!toggleButton) return;
  
  // Update button icon based on current theme
  updateToggleIcon();
  
  // Add click handler
  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    updateToggleIcon();
    
    // Dispatch custom event for other modules to listen to
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: newTheme } 
    }));
  });
}

/**
 * Update toggle button icon based on current theme
 */
function updateToggleIcon() {
  const toggleButton = document.querySelector('.theme-toggle');
  if (!toggleButton) return;
  
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';
  
  // Update aria-label for accessibility
  toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

/**
 * Get current theme
 */
export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

/**
 * Set specific theme
 */
export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateToggleIcon();
}