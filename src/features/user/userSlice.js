import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialState = {
	isLoading: false,
	user: null,
};

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user, thunkAPI) => {
		console.log('vo funkci');
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
			console.log(error.response);
		}
	}
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
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
		throw new Error('Logout failed');
	}
});

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (_, thunkAPI) => {
		try {
			const response = await customFetch.get('/users/showMe', {
				withCredentials: true,
			});
			console.log('fetchujem usera');
			console.log(response);
			return response.data.user;
		} catch (error) {
			// Handle error fetching user data
			console.error(error);
			throw error;
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
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				console.log(payload);
				const { user } = payload;
				state.isLoading = false;
				state.user = user;
				toast.success(`Welcome back ${user.name}`);
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
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
