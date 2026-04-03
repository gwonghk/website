/**
 * PetCraft - Instagram Serverless Function
 * 
 * This function fetches posts from the Instagram Basic Display API.
 * 
 * Deploy to Netlify: Place this file in `netlify/functions/instagram.js`
 * Deploy to Vercel: Rename to `api/instagram.js` or `pages/api/instagram.js`
 * 
 * Required environment variables:
 * - INSTAGRAM_ACCESS_TOKEN: Your Instagram Basic Display API access token
 * - INSTAGRAM_USER_ID: Your Instagram User ID
 * 
 * Setup Instructions:
 * 1. Create a Meta Developer account at https://developers.facebook.com
 * 2. Create a new app and add "Instagram Basic Display" product
 * 3. Generate an access token through the API Graph Explorer
 * 4. Add the token and user ID to your environment variables
 */

// Netlify function export (remove this line for Vercel)
export const handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json'
  };
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;
    
    if (!accessToken || !userId) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Instagram API credentials not configured',
          data: getPlaceholderPosts()
        })
      };
    }
    
    // Fetch user profile to get recent media
    const fields = 'id,username,media_count,account_type,media{id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{id,media_url,media_type}}';
    const url = `https://graph.instagram.com/v18.0/${userId}?fields=${fields}&access_token=${accessToken}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Instagram API error:', errorData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to fetch Instagram data',
          data: getPlaceholderPosts()
        })
      };
    }
    
    const data = await response.json();
    
    // Transform the response to our format
    const posts = data.media?.data?.map(post => ({
      id: post.id,
      mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      permalink: post.permalink,
      caption: post.caption || '',
      likeCount: 0, // Basic Display API doesn't provide like counts
      commentCount: 0, // Basic Display API doesn't provide comment counts
      timestamp: post.timestamp,
      mediaType: post.media_type
    })) || [];
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data: posts,
        username: data.username
      })
    };
    
  } catch (error) {
    console.error('Instagram function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        data: getPlaceholderPosts()
      })
    };
  }
};

/**
 * Placeholder posts for demo mode
 */
function getPlaceholderPosts() {
  return [
    {
      id: 'placeholder-1',
      mediaUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
      permalink: '#',
      caption: 'Our latest custom collar design - perfect for your furry friend! 🐕',
      likeCount: 847,
      commentCount: 32
    },
    {
      id: 'placeholder-2',
      mediaUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
      permalink: '#',
      caption: 'Behind the scenes at our workshop - precision crafting every piece.',
      likeCount: 1204,
      commentCount: 58
    },
    {
      id: 'placeholder-3',
      mediaUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
      permalink: '#',
      caption: 'Happy customer alert! 🎉 Max loves his new personalized tag.',
      likeCount: 956,
      commentCount: 44
    },
    {
      id: 'placeholder-4',
      mediaUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=600&fit=crop',
      permalink: '#',
      caption: 'Weekend project - designing new patterns for our spring collection.',
      likeCount: 723,
      commentCount: 29
    },
    {
      id: 'placeholder-5',
      mediaUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&h=600&fit=crop',
      permalink: '#',
      caption: 'Quality check complete! Every piece meets our high standards. ✓',
      likeCount: 1089,
      commentCount: 67
    },
    {
      id: 'placeholder-6',
      mediaUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=600&fit=crop',
      permalink: '#',
      caption: 'Bella showing off her new eco-friendly accessories! 🌿🐾',
      likeCount: 1342,
      commentCount: 89
    }
  ];
}

/**
 * Vercel export (uncomment if deploying to Vercel)
 */
// export default async function handler(req, res) {
//   const response = await fetch('https://' + process.env.URL + '/.netlify/functions/instagram');
//   const data = await response.json();
//   res.status(200).json(data);
// }