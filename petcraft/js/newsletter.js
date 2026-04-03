/**
 * PetCraft - Newsletter Module
 * 
 * Handles newsletter form submission and validation.
 */

import { validateEmail } from './utils.js';

/**
 * Initialize newsletter forms
 */
export function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', handleSubmit);
    
    // Real-time validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
      emailInput.addEventListener('blur', () => validateField(emailInput));
      emailInput.addEventListener('input', () => clearError(emailInput));
    }
  });
}

/**
 * Handle form submission
 */
async function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const emailInput = form.querySelector('input[type="email"]');
  const firstNameInput = form.querySelector('input[name="FNAME"]');
  
  // Validate email
  if (!validateField(emailInput)) {
    emailInput.focus();
    return;
  }
  
  // Disable button during submission
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Subscribing...';
  
  try {
    if (SITE_CONFIG.mailchimp.enabled && SITE_CONFIG.mailchimp.actionUrl) {
      // Submit to Mailchimp via form action (redirect method)
      await submitViaRedirect(form);
    } else if (SITE_CONFIG.mailchimp.enabled && SITE_CONFIG.mailchimp.apiEndpoint) {
      // Submit via API
      await submitViaAPI(form);
    } else {
      // Demo mode - simulate success
      await simulateSuccess();
    }
    
    // Show success message
    showSuccess(form);
    
  } catch (error) {
    console.error('Newsletter submission error:', error);
    showError(form, error.message || 'Something went wrong. Please try again.');
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

/**
 * Submit via Mailchimp redirect
 */
async function submitViaRedirect(form) {
  return new Promise((resolve, reject) => {
    // Create a hidden iframe for the redirect
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'newsletter-target';
    document.body.appendChild(iframe);
    
    // Update form target
    form.target = 'newsletter-target';
    
    // Handle iframe load (Mailchimp redirect completion)
    iframe.onload = () => {
      // Check if we got a success response
      setTimeout(() => {
        document.body.removeChild(iframe);
        resolve();
      }, 1000);
    };
    
    iframe.onerror = () => {
      document.body.removeChild(iframe);
      reject(new Error('Failed to connect to mailing service'));
    };
    
    // Timeout after 10 seconds
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
        reject(new Error('Request timed out'));
      }
    }, 10000);
    
    form.submit();
  });
}

/**
 * Submit via API endpoint
 */
async function submitViaAPI(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  const response = await fetch(SITE_CONFIG.mailchimp.apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Subscription failed');
  }
  
  return response.json();
}

/**
 * Simulate success for demo mode
 */
async function simulateSuccess() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

/**
 * Validate a single field
 */
function validateField(input) {
  const value = input.value.trim();
  const isEmail = input.type === 'email';
  
  if (!value) {
    showFieldError(input, 'This field is required');
    return false;
  }
  
  if (isEmail && !validateEmail(value)) {
    showFieldError(input, 'Please enter a valid email address');
    return false;
  }
  
  clearError(input);
  return true;
}

/**
 * Show field error
 */
function showFieldError(input, message) {
  input.classList.add('form-input--error');
  
  let errorEl = input.parentElement.querySelector('.form-error');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    input.parentElement.appendChild(errorEl);
  }
  
  errorEl.textContent = message;
}

/**
 * Clear field error
 */
function clearError(input) {
  input.classList.remove('form-input--error');
  const errorEl = input.parentElement?.querySelector('.form-error');
  if (errorEl) {
    errorEl.remove();
  }
}

/**
 * Show form success
 */
function showSuccess(form) {
  const successEl = form.querySelector('.newsletter-form__success');
  if (successEl) {
    successEl.classList.add('newsletter-form__success--visible');
    form.reset();
    
    // Scroll to success message
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    // Fallback: show alert
    alert('Thank you for subscribing!');
  }
}

/**
 * Show form error
 */
function showError(form, message) {
  const errorEl = form.querySelector('.newsletter-form__error');
  if (errorEl) {
    errorEl.textContent = message;
  }
}