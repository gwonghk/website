/**
 * PetCraft - Instagram Feed Module
 * 
 * Fetches and displays Instagram posts.
 * Uses placeholder data when API is not configured.
 */

const INSTAGRAM_PLACEHOLDER_POSTS = [
  {
    id: '1',
    mediaUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
    permalink: '#',
    caption: 'Our latest custom collar design - perfect for your furry friend! 🐕',
    likeCount: 847,
    commentCount: 32
  },
  {
    id: '2',
    mediaUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
    permalink: '#',
    caption: 'Behind the scenes at our workshop - precision crafting every piece.',
    likeCount: 1204,
    commentCount: 58
  },
  {
    id: '3',
    mediaUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
    permalink: '#',
    caption: 'Happy customer alert! 🎉 Max loves his new personalized tag.',
    likeCount: 956,
    commentCount: 44
  },
  {
    id: '4',
    mediaUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=600&fit=crop',
    permalink: '#',
    caption: 'Weekend project - designing new patterns for our spring collection.',
    likeCount: 723,
    commentCount: 29
  },
  {
    id: '5',
    mediaUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&h=600&fit=crop',
    permalink: '#',
    caption: 'Quality check complete! Every piece meets our high standards. ✓',
    likeCount: 1089,
    commentCount: 67
  },
  {
    id: '6',
    mediaUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=600&fit=crop',
    permalink: '#',
    caption: 'Bella showing off her new eco-friendly accessories! 🌿🐾',
    likeCount: 1342,
    commentCount: 89
  }
];

/**
 * Initialize Instagram feed
 */
export async function initInstagramFeed() {
  const feedContainer = document.querySelector('.instagram-feed');
  
  if (!feedContainer) return;
  
  // Check if real API is enabled
  if (SITE_CONFIG.instagram.enabled) {
    try {
      const posts = await fetchInstagramPosts();
      renderInstagramPosts(posts, feedContainer);
    } catch (error) {
      console.warn('Failed to fetch Instagram posts, showing placeholder:', error);
      renderInstagramPosts(INSTAGRAM_PLACEHOLDER_POSTS, feedContainer, true);
    }
  } else {
    // Show placeholder data
    renderInstagramPosts(INSTAGRAM_PLACEHOLDER_POSTS, feedContainer, true);
  }
}

/**
 * Fetch posts from Instagram API via serverless function
 */
async function fetchInstagramPosts() {
  const response = await fetch('/.netlify/functions/instagram', {
    headers: {
      'Accept': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data;
}

/**
 * Render Instagram posts to container
 */
function renderInstagramPosts(posts, container, isPlaceholder = false) {
  // Clear container
  container.innerHTML = '';
  
  // Render posts (limit to 6)
  const displayPosts = posts.slice(0, 6);
  
  displayPosts.forEach(post => {
    const postElement = document.createElement('a');
    postElement.href = post.permalink;
    postElement.className = 'instagram-post';
    postElement.target = '_blank';
    postElement.rel = 'noopener noreferrer';
    
    postElement.innerHTML = `
      <img src="${post.mediaUrl}" alt="${post.caption ? post.caption.substring(0, 50) : 'Instagram post'}" loading="lazy">
      <div class="instagram-post__overlay">
        <div class="instagram-post__stats">
          <span class="instagram-post__stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            ${formatCount(post.likeCount)}
          </span>
        </div>
      </div>
    `;
    
    container.appendChild(postElement);
  });
  
  // Add CTA link
  const ctaElement = document.createElement('div');
  ctaElement.className = 'instagram-feed__cta';
  ctaElement.innerHTML = `
    <a href="https://instagram.com/${SITE_CONFIG.social.instagram}" class="instagram-feed__link" target="_blank" rel="noopener noreferrer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
      Follow us on Instagram
    </a>
  `;
  
  container.appendChild(ctaElement);
  
  // Add placeholder notice if using placeholder data
  if (isPlaceholder) {
    container.setAttribute('data-placeholder', 'true');
  }
}

/**
 * Format large numbers (e.g., 1200 -> 1.2K)
 */
function formatCount(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}