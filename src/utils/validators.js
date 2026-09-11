import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES } from './constants';

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

/**
 * Validate password meets minimum length requirements
 * @param {string} password
 * @param {number} minLength
 * @returns {boolean}
 */
export const isValidPassword = (password, minLength = 6) => {
  return typeof password === 'string' && password.length >= minLength;
};

/**
 * Validate image file format and size
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'Please select an image file.' };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file format. Supported formats: JPEG, PNG, WEBP, GIF, AVIF.'
    };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: 'Image file size exceeds the 10MB limit.'
    };
  }

  return { valid: true };
};
