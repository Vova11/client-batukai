import axios from 'axios';

const customFetch = axios.create({
	baseURL: 'https://candysmokes.eu/api/v1',
	// baseURL: 'http://localhost:3002/api/v1',
});

export default customFetch;

customFetch.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		if (error.code === 'ECONNREFUSED') {
			console.error('Connection refused error:', 'ERRRORRRR');
			// Handle the connection refused error here
			// For example, show an error message to the user or retry the request
		}
		return Promise.reject(error);
	}
);
