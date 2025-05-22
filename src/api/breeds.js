import api from './axiosInstance';

// Fetches all available cat breeds
export const getAllBreeds = () => api.get('/breeds');

// Fetches images filtered by breed, limit, page, or order
export const getBreedImages = (params) =>
  api.get('/images/search', { params });
// params: { breed_id, limit, page, order }