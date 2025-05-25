import api from './axiosInstance';
import { USER_SUB_ID } from '../utils/user';
import { getUserVotes } from './logs';

// Adds an image to favourites using vote value 2
export const addFavouriteVote = (image_id) =>
	api.post('/votes', {
		image_id,
		value: 2,
		sub_id: USER_SUB_ID,
	});

// Removes an image from favourites by deleting vote with value 2
export const removeFavouriteVote = async (image_id) => {
	const res = await getUserVotes();
	const favVote = res.data.find(
		(v) => v.image_id === image_id && v.value === 2,
	);
	if (favVote) {
		return api.delete(`/votes/${favVote.id}`);
	}
};
