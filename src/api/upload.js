import api from './axiosInstance';
import { USER_SUB_ID } from '../utils/user';

// Uploads a custom cat image using form data
export const uploadImage = (file) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('sub_id', USER_SUB_ID);

	return api.post('/images/upload', formData);
};
