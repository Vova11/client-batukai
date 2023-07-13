import { clearStore } from '../features/user/userSlice';

export const authHeader = () => {
	return {
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	};
};

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
	if (error.response.status === 401) {
		thunkAPI.dispatch(clearStore());
		return thunkAPI.rejectWithValue('Unauthorized! Loging out...');
	}
	return thunkAPI.rejectWithValue(error.response.data.msg);
};
