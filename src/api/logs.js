import api from './axiosInstance';
import { USER_SUB_ID } from '../utils/user';

// Retrieves the user's vote history
export const getUserVotes = (limit = 100) =>
	api.get('/votes', {
		params: {
			sub_id: USER_SUB_ID,
			limit,
			order: 'DESC',
		},
	});

// Filters user votes by vote type (1, 2, or 3)
export const getVotesByType = async (voteType) => {
	const res = await getUserVotes();
	return res.data.filter((v) => v.value === voteType);
};
