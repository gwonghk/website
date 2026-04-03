# PetCraft - Static Product Website Template

A modern, responsive static website template for a 3D printed pet product launch. Built with pure HTML, CSS, and vanilla JavaScript.

## 📁 Project Structure

```
petcraft/
├── index.html          # Landing page (home)
├── about.html          # About us page
├── contact.html        # Contact page
├── faq.html            # FAQ page
├── coming-soon.html    # Pre-launch page (optional)
├── thank-you.html      # Post-signup thank you page
├── 404.html            # 404 error page
├── privacy-policy.html # Privacy policy
├── terms.html          # Terms of service
│
├── css/
│   ├── main.css        # Base styles, variables, utilities
│   └── components.css # UI components (buttons, cards, forms, etc.)
│
├── js/
│   ├── config.js       # Global configuration (brand, colors, API keys)
│   ├── main.js         # Main entry point
│   ├── navigation.js   # Header & mobile menu
│   ├── dark-mode.js    # Dark/light theme toggle
│   ├── lightbox.js     # Image gallery lightbox
│   ├── instagram.js   # Instagram feed integration
│   ├── newsletter.js   # Newsletter form handling
│   ├── animations.js   # Scroll animations
│   ├── parallax.js     # Parallax effects
│   └── utils.js        # Utility functions
│
├── api/
│   └── instagram.js    # Serverless function for Instagram API
│
├── sitemap.xml         # SEO sitemap
└── README.md           # This file
```

## 🚀 Quick Start

1. **Open in Browser**: Simply open `index.html` in a web browser to preview
2. **Local Server** (recommended for full functionality):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (npx)
   npx serve
   
   # Then visit http://localhost:8000
   ```

## ⚙️ Configuration

All site settings are in **`js/config.js`**:

```javascript
const SITE_CONFIG = {
  brand: 'PetCraft',           // Change brand name here
  email: 'hello@petcraft.example',
  social: {
    instagram: 'petcraft',
    twitter: 'petcraft',
    // ...
  },
  instagram: {
    enabled: false,             // Set to true when API is configured
    accessToken: 'YOUR_TOKEN',
    userId: 'YOUR_USER_ID',
  },
  // ... more options
};
```

### Changing Colors

Update the `colors` section in `config.js`. Colors are defined as CSS variables and work for both light and dark modes.

### Adding Products

Edit the product gallery section in `index.html`. Each product is an `.gallery__item` element.

## 🌐 Deployment to Vercel

1. Push this project to a GitHub repository
2. Connect the repository to Vercel
3. Deploy!

Vercel handles static files automatically. No build step required.

## 📱 Instagram API Setup

### Option A: Serverless Function (Recommended)

1. Create a [Meta Developer](https://developers.facebook.com/) account
2. Create a new app → Add "Instagram Basic Display" product
3. Generate an access token via Graph API Explorer
4. Set environment variables in Vercel:
   - `INSTAGRAM_ACCESS_TOKEN`
   - `INSTAGRAM_USER_ID`
5. Update `js/config.js`:
   ```javascript
   instagram: {
     enabled: true,
     accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
     userId: process.env.INSTAGRAM_USER_ID,
   }
   ```

### Option B: Placeholder Mode (Default)

The site ships with placeholder posts. Just set:
```javascript
instagram: {
  enabled: false,  // Shows demo posts
}
```

## 📧 Mailchimp Integration

1. Get your Mailchimp form action URL from:
   - Mailchimp dashboard → Audience → Signup forms → Embedded forms
2. Update `js/config.js`:
   ```javascript
   mailchimp: {
     enabled: true,
     actionUrl: 'https://your-account.us1.list-manage.com/subscribe/post?u=XXX&id=XXX',
   }
   ```
3. Update the form `action` attribute in each HTML file.

## 🎨 Customization

### Typography
Fonts are loaded from Google Fonts (Inter). Change in `index.html` head:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Dark Mode
Toggle button is included. Theme preference is saved to localStorage. Update colors in CSS variables.

### Adding New Pages
1. Copy an existing page (e.g., `about.html`)
2. Update content and title
3. Update navigation links in header

### Scroll Animations
Add `[data-animate]` attribute to any element. Use `[data-delay="200"]` for staggered animations.

## 📦 Converting to React

The BEM naming convention and component-based structure make this easy to convert:

- `.card` → `<Card />` component
- `.btn` → `<Button />` component
- `.accordion` → `<Accordion />` component

CSS variables map directly to React state/props.

## 🧹 Maintenance

### Updating Placeholder Content
- Replace Unsplash image URLs with your own
- Update testimonials in `index.html`
- Edit FAQ content in `faq.html`

### SEO
- Update meta tags in each HTML file's `<head>`
- Update `sitemap.xml` with actual URLs
- Add `robots.txt` if needed

## 📄 License

Free to use for personal and commercial projects.

---

Built with ❤️ for pet lovers everywhere.