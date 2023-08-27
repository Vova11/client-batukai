import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';
import {
	authHeader,
	checkForUnauthorizedResponse,
} from '../../utils/authHeader';
import { clearAllProductsState } from '../allProducts/allProductsSlice';
import { clearValues } from '../product/productSlice';
import { clearUser } from './userSlice';

export const loginUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.post(url, user, authHeader());
		console.log(resp);
		return resp.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const registerUserThunk = async (url, user, thunkAPI) => {
	try {
		const response = await customFetch.post(url, user, authHeader());
		console.log('Co pride na register?');
		console.log(response);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const getUserThunk = async (id, thunkAPI) => {
	try {
		const resp = await customFetch.get(`/users/${id}`, authHeader());
		return resp.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const logoutUserThunk = async (url, thunkAPI) => {
	try {
		await customFetch.delete(url, authHeader()); // Call your logout route using axios
		return true;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const fetchUserThunk = async (thunkAPI) => {
	try {
		const response = await customFetch.get(
			'/users/showMe',
			{},
			{ withCredentials: true }
		);
		return response.data.user;
	} catch (error) {
		console.log(error);
		// Handle error fetching user data
		return thunkAPI.rejectWithValue(error.response.msg);
	}
};

export const updateUserThunk = async (user, thunkAPI) => {
	try {
		const resp = await customFetch.patch(
			`/users/${user.id}`,
			user,
			authHeader()
		);
		return resp.data;
	} catch (error) {
		checkForUnauthorizedResponse('Unauthorized! Logging out', thunkAPI);
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

// export const fetchUserThunk = async (url, thunkAPI) => {
// 	try {
// 		const response = await customFetch.get(url, authHeader());
// 		return response.data.user;
// 	} catch (error) {
// 		console.log(error);
// 		// Handle error fetching user data
// 		return thunkAPI.rejectWithValue(error.response.msg);
// 	}
// };

// export const updateUserThunk = async (url, user, thunkAPI) => {
// 	try {
// 		const resp = await customFetch.patch(url, user, authHeader());

// 		return resp.data;
// 	} catch (error) {
// 		checkForUnauthorizedResponse('Unauthorized! Logging out', thunkAPI);
// 		return thunkAPI.rejectWithValue(error.response.data.msg);
// 	}
// };

export const clearStoreThunk = async (message, thunkAPI) => {
	try {
		thunkAPI.dispatch(logoutUser(message));
		thunkAPI.dispatch(clearAllProductsState());
		thunkAPI.dispatch(clearValues());
		thunkAPI.dispatch(clearUser());
		return Promise.resolve();
	} catch (error) {
		return Promise.reject();
	}
};

export const verifyEmailThunk = async (
	{ verificationToken, email },
	thunkAPI
) => {
	try {
		const response = await customFetch.post('/auth/verify-email', {
			verificationToken,
			email,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const resetPasswordThunk = async (
	{ password, token, email },
	thunkAPI
) => {
	console.log(password);
	console.log(email);
	try {
		const response = await customFetch.post('/auth/reset-password', {
			password,
			token,
			email,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const forgotPasswordThunk = async (email, thunkAPI) => {
	console.log('reseting for email: ', email);
	try {
		const response = await customFetch.post('/auth/forgot-password', { email });
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
