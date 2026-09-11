export const CONTENT_TYPES = [
  { value: 'Painting', label: '🎨 Painting / Artwork' },
  { value: 'Reel', label: '🎬 Reel / Short Video' },
  { value: 'Product', label: '🛍️ Product / Commercial' },
  { value: 'Personal', label: '📸 Personal / Lifestyle' }
];

export const MOOD_OPTIONS = [
  { value: 'Cute', label: '🥰 Cute & Playful' },
  { value: 'Aesthetic', label: '✨ Aesthetic & Chill' },
  { value: 'Funny', label: '😂 Funny & Witty' },
  { value: 'Emotional', label: '🥺 Emotional & Heartfelt' },
  { value: 'Professional', label: '💼 Professional & Sleek' },
  { value: 'Minimal', label: '🌿 Minimalist & Clean' },
  { value: 'Romantic', label: '💖 Romantic & Warm' }
];

export const LENGTH_OPTIONS = [
  { value: 'Short', label: '⚡ Short (1-2 sentences)' },
  { value: 'Medium', label: '📝 Medium (3-5 sentences)' },
  { value: 'Long', label: '📖 Long (Story / Mini-blog)' }
];

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif'
];

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
