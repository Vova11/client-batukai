import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

export const loginUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.post(url, user, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});

		return resp.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const registerUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.post(url, user, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});

		return resp.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const getUserThunk = async (url, thunkAPI) => {
	try {
		const resp = await customFetch.get(url, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});
		return resp.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const logoutUserThunk = async (url, thunkAPI) => {
	try {
		await customFetch.delete(url, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		}); // Call your logout route using axios
		return true;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const fetchUserThunk = async (url, thunkAPI) => {
	try {
		const response = await customFetch.get(url, {
			withCredentials: true,
		});
		return response.data.user;
	} catch (error) {
		// Handle error fetching user data
		return thunkAPI.rejectWithValue(error);
	}
};

export const updateUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.patch(url, user, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});

		return resp.data;
	} catch (error) {
		if (error.response.status === 401) {
			thunkAPI.dispatch(logoutUser());
			return thunkAPI.rejectWithValue('Unauthorized! Logging out');
		}
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
