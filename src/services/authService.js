import axiosClient from '../api/axiosClient';

/**
 * Authentication service handling registration, login, and session validation
 */
export const authService = {
  register: async (userData) => {
    return await axiosClient.post('/auth/register', userData);
  },

  login: async (credentials) => {
    return await axiosClient.post('/auth/login', credentials);
  },

  getMe: async () => {
    return await axiosClient.get('/auth/me');
  }
};

export default authService;
