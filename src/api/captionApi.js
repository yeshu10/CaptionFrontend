import axiosClient from './axiosClient';

export const captionApi = {
  // Generate caption using Gemini with uploaded image and options
  generate: async (formData) => {
    return await axiosClient.post('/captions/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Save generated caption to database
  save: async (captionData) => {
    return await axiosClient.post('/captions/save', captionData);
  },

  // Get user generation history with query filters
  getAll: async (params = {}) => {
    return await axiosClient.get('/captions', { params });
  },

  // Get single caption
  getById: async (id) => {
    return await axiosClient.get(`/captions/${id}`);
  },

  // Update caption
  update: async (id, data) => {
    return await axiosClient.put(`/captions/${id}`, data);
  },

  // Delete caption
  delete: async (id) => {
    return await axiosClient.delete(`/captions/${id}`);
  }
};

export default captionApi;
