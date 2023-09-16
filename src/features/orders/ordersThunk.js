import customFetch from '../../utils/axios';

export const getAllOrdersThunk = async (_, thunkAPI) => {
	try {
		const response = await customFetch.get('/orders');
		return response.data;
	} catch (error) {
		console.log(error.message);
		return thunkAPI.rejectWithValue(error.message);
	}
};

export const deleteOrderThunk = async (orderId, thunkAPI) => {
	try {
		const response = await customFetch.delete(`orders/${orderId}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});

		// Return the response data if needed
		return response.data.message;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const showOrderThunk = async (orderId, thunkAPI) => {
	try {
		const response = await customFetch.get(`orders/${orderId}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});
		// Return the response data if needed
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
