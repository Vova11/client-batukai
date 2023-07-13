import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	fetchUserThunk,
	getUserThunk,
	loginUserThunk,
	logoutUserThunk,
	updateUserThunk,
	verifyEmailThunk,
	clearStoreThunk,
	resetPasswordThunk,
	forgotPasswordThunk,
} from './userThunk';

const initialState = {
	isLoading: false,
	user: null,
	userObject: {},
	success: '',
	error: null,
};

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user, thunkAPI) => {
		return loginUserThunk('/auth/login', user, thunkAPI);
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (user, thunkAPI) => {
		return loginUserThunk('/auth/register', user, thunkAPI);
	}
);

export const getUser = createAsyncThunk(
	'user/getUser',
	async (id, thunkAPI) => {
		return getUserThunk(`/users/${id}`, thunkAPI);
	}
);

export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (_, thunkAPI) => {
		return logoutUserThunk('/auth/logout', thunkAPI);
	}
);

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (_, thunkAPI) => {
		return fetchUserThunk('/users/showMe', thunkAPI);
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (user, thunkAPI) => {
		return updateUserThunk(`/users/${user.id}`, user, thunkAPI);
	}
);

export const verifyEmail = createAsyncThunk(
	'auth/verifyEmail',
	verifyEmailThunk
);

export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	resetPasswordThunk
);

export const forgotPassword = createAsyncThunk(
	'auth/forgotPassword',
	forgotPasswordThunk
);

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearSuccessState: (state) => {
			state.success = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				const { user } = payload;
				state.isLoading = false;
				state.user = user;
				state.error = null;
				toast.success(`Welcome back ${user.name}`);
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.error = payload;
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				const { user, msg } = payload;
				state.success = msg;
				state.isLoading = false;
				state.user = user;
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.error = 'Server Error';
				state.isLoading = false;
				toast.error('Server Error');
			})
			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(fetchUser.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
				state.userObject = {};
			})
			.addCase(logoutUser.pending, (state) => {
				state.isLoading = true;
				state.user = null;
			})
			.addCase(logoutUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = null;
				toast.success('User was logged out');
			})
			.addCase(logoutUser.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(getUser.pending, (state) => {
				state.isLoading = true;
				state.userObject = {};
			})
			.addCase(getUser.fulfilled, (state, { payload }) => {
				const { user } = payload;
				state.isLoading = false;
				state.userObject = user;
			})
			.addCase(getUser.rejected, (state) => {
				state.isLoading = false;
				state.userObject = {};
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				const { user } = payload;
				state.isLoading = true;
				state.userObject = user;
				state.user = user;
				toast.success('User was updated');
			})
			.addCase(updateUser.rejected, (state) => {
				state.isLoading = false;
				state.userObject = {};
			})
			.addCase(clearStore.rejected, () => {
				toast.error('There was an error');
			})
			.addCase(forgotPassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(forgotPassword.fulfilled, (state, { payload }) => {
				state.success = payload.msg;
				state.isLoading = false;
			})
			.addCase(forgotPassword.rejected, (state, { payload }) => {
				state.success = payload.msg;
				state.isLoading = false;
			})
			.addCase(resetPassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(resetPassword.fulfilled, (state, { payload }) => {
				state.success = payload.msg;
				state.isLoading = false;
			})
			.addCase(resetPassword.rejected, (state, { payload }) => {
				state.success = payload.msg;
				state.isLoading = false;
			});
	},
});
export const { toggleSidebar, clearSuccessState } = userSlice.actions;
export default userSlice.reducer;
