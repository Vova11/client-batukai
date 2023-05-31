import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialState = {
	isLoading: false,
	user: null,
	error: null,
};

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user, thunkAPI) => {
		console.log('LOGIN USER');
		console.log(user);
		try {
			const resp = await customFetch.post('/auth/login', user, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			});

			return resp.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (_, thunkAPI) => {
		try {
			console.log('calling delete route');
			await customFetch.delete('/auth/logout', {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			}); // Call your logout route using axios
			return true;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (_, thunkAPI) => {
		try {
			const response = await customFetch.get('/users/showMe', {
				withCredentials: true,
			});
			return response.data.user;
		} catch (error) {
			// Handle error fetching user data
			console.error(error);
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				console.log(payload);
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
			})
			.addCase(logoutUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(logoutUser.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
			});
	},
});

export default userSlice.reducer;
