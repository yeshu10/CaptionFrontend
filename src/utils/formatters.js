/**
 * Format ISO date string to human-readable date and time
 * @param {string|Date} dateInput
 * @returns {string}
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

/**
 * Clean and format array of hashtags with '#' prefixes
 * @param {Array<string>|string} tags
 * @returns {Array<string>}
 */
export const formatHashtags = (tags) => {
  if (!tags) return [];
  if (typeof tags === 'string') {
    return tags
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));
  }
  return tags.map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));
};

/**
 * Count words in a string
 * @param {string} text
 * @returns {number}
 */
export const countWords = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

/**
 * Truncate text with ellipsis if length exceeds limit
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text || '';
  return text.slice(0, maxLength).trim() + '...';
};
