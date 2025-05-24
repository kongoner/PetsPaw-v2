import api from './axiosInstance';

// Fetches all available cat breeds
export const getAllBreeds = (params) => api.get('/breeds', { params });
// params: { breed_id, limit, page, order }
