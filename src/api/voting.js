import api from './axiosInstance';
import { USER_SUB_ID } from '../utils/user';

// Sends a vote: 1 = Like, 2 = Favourite, 3 = Dislike
export const voteForImage = (image_id, value) =>
  api.post('/votes', {
    image_id,
    value,
    sub_id: USER_SUB_ID,
  });

// Gets a single random image for voting
export const getRandomImageForVoting = () =>
  api.get('/images/search', {
    params: { limit: 1, size: 'full' },
  });