import api from './axiosInstance';

// Gets gallery images with filters
export const getGalleryImages = (params) =>
	api.get('/images/search', { params });
// params: { limit, order, mime_types, breed_id }
