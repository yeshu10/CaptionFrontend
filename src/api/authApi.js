import axiosClient from './axiosClient';

export const authApi = {
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

export default authApi;
