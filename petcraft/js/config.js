/**
 * PetCraft - Global Configuration
 * 
 * Edit these values to customize your site.
 * All pages reference this config for consistency.
 */

const SITE_CONFIG = {
  // Brand Identity
  brand: 'PetCraft',
  tagline: 'Precision-crafted for your furry friends',
  description: 'Premium 3D printed accessories designed with love for pets everywhere.',
  
  // Contact Information
  email: 'hello@petcraft.example',
  phone: '+1 (555) 123-4567',
  address: '123 Maker Street, San Francisco, CA 94102',
  
  // Social Media (usernames without @)
  social: {
    instagram: 'petcraft',
    twitter: 'petcraft',
    facebook: 'petcraft',
    tiktok: 'petcraft',
  },
  
  // Instagram API Configuration
  instagram: {
    enabled: false, // Set to true once API is configured
    accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
    userId: 'YOUR_INSTAGRAM_USER_ID',
  },
  
  // Mailchimp Configuration
  mailchimp: {
    enabled: true,
    actionUrl: 'https://YOUR_SUBDOMAIN.us1.list-manage.com/subscribe/post?u=XXXX&amp;id=XXXX',
    // Leave empty to use form submission without redirect
    apiEndpoint: '',
  },
  
  // SEO
  seo: {
    siteUrl: 'https://petcraft.example',
    defaultImage: '/assets/images/og-default.jpg',
    twitterHandle: '@petcraft',
    locale: 'en_US',
  },
  
  // Feature Flags
  features: {
    darkMode: true,
    parallax: true,
    smoothScroll: true,
    stickyHeader: true,
    newsletterPopup: false, // Set to true to enable newsletter popup
  },
  
  // Colors (overridden by dark mode if enabled)
  colors: {
    primary: '#4F46E5',      // Main brand color
    secondary: '#10B981',    // Accent color
    background: '#FFFFFF',   // Page background
    surface: '#F9FAFB',      // Card/section backgrounds
    text: '#111827',         // Primary text
    textMuted: '#6B7280',    // Secondary text
    border: '#E5E7EB',       // Borders
  },
};

// Dark mode colors (applied when dark mode is active)
SITE_CONFIG.colorsDark = {
  primary: '#818CF8',       // Lighter shade for dark mode
  secondary: '#34D399',      // Brighter accent for dark mode
  background: '#111827',     // Dark background
  surface: '#1F2937',        // Card/section backgrounds
  text: '#F9FAFB',           // Light text
  textMuted: '#9CA3AF',      // Muted text
  border: '#374151',         // Darker borders
};

// Newsletter form fields (for Mailchimp)
SITE_CONFIG.newsletterFields = [
  { name: 'FNAME', type: 'text', placeholder: 'First Name', required: true },
  { name: 'EMAIL', type: 'email', placeholder: 'Email Address', required: true },
];
