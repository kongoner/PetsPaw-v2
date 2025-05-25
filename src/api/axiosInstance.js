import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.thecatapi.com/v1',
	headers: {
		'x-api-key':
			'live_lQaLCNVE08afOEATctq7LgFSS1Qn8Dtn3HHQWnfvXchMRAHqK3aYhHe0AYPKtmnW',
	},
});

export default api;
