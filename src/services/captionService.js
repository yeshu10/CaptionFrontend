import axiosClient from '../api/axiosClient';

/**
 * Caption service handling multimodal generation, persistence, queries, and mutations
 */
export const captionService = {
  // Generate caption using Gemini with uploaded image and style options
  generate: async (formData) => {
    return await axiosClient.post('/captions/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Save generated caption to user history
  save: async (captionData) => {
    return await axiosClient.post('/captions/save', captionData);
  },

  // Query paginated generations with optional filters
  getAll: async (params = {}) => {
    return await axiosClient.get('/captions', { params });
  },

  // Retrieve single caption by ID
  getById: async (id) => {
    return await axiosClient.get(`/captions/${id}`);
  },

  // Update saved caption or components
  update: async (id, data) => {
    return await axiosClient.put(`/captions/${id}`, data);
  },

  // Remove caption from history
  delete: async (id) => {
    return await axiosClient.delete(`/captions/${id}`);
  }
};

export default captionService;
