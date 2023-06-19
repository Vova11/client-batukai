import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';

const initialState = {
	isLoading: false,
	name: '',
	description: '',
	price: 0,
	featured: false,
	image: '',
	published: false,
	freeShipping: false,
	averageRating: 0.0,
	numberOfReviews: 0.0,
	isEditing: false,
	editProduct: '',
};

export const createProduct = createAsyncThunk(
	'product/createProduct',
	async (product, thunkAPI) => {
		try {
			const resp = await customFetch.post('/products', product, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			});

			thunkAPI.dispatch(clearValues());
			return resp.data;
		} catch (error) {
			if (error.response.status === 401) {
				thunkAPI.dispatch(logoutUser());
				return thunkAPI.rejectWithValue('Unauthorized');
			}
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const uploadMultipleProductImages = createAsyncThunk(
	'product/uploadMultiple',
	async (images) => {
		try {
			const response = await customFetch.post(
				`/products/uploadMultipleImages`,
				{
					images,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const uploadSingleProductImage = createAsyncThunk(
	'product/uploadImage',
	async (base64Image) => {
		try {
			const response = await customFetch.post(
				'/products/uploadImage',
				{
					image: base64Image,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const removeImage = createAsyncThunk(
	'product/removeImage',
	async (publicId) => {
		try {
			const response = customFetch.post(
				'products/removeImage',
				{
					publicId,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);

			// Return the response data if needed
			return response.data;
		} catch (error) {
			// Handle the error as needed
			throw error;
		}
	}
);

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		handleChangeState: (state, { payload: { name, value } }) => {
			state[name] = value;
		},
		clearValues: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				console.log('Fullfield');
				console.log(action);
				state.isLoading = false;
				toast.success('Product created');
			})
			.addCase(createProduct.rejected, (state, { payload }) => {
				console.log('Rejected');
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(uploadMultipleProductImages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(uploadMultipleProductImages.fulfilled, (state, action) => {
				console.log('Fullfield');
				console.log(action);
				state.isLoading = false;
			})
			.addCase(uploadMultipleProductImages.rejected, (state, { payload }) => {
				console.log('Rejected');
				state.isLoading = false;
			})
			.addCase(uploadSingleProductImage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(uploadSingleProductImage.fulfilled, (state, action) => {
				console.log('Fullfield');
				console.log(action);
				state.isLoading = false;
			})
			.addCase(uploadSingleProductImage.rejected, (state, { payload }) => {
				console.log('Rejected');
				state.isLoading = false;
			})
			.addCase(removeImage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeImage.fulfilled, (state) => {
				console.log('Fullfield');
				state.isLoading = false;
			})
			.addCase(removeImage.rejected, (state) => {
				console.log('Rejected');
				state.isLoading = false;
			});
	},
});
export const { handleChangeState, clearValues } = productSlice.actions;
export default productSlice.reducer;
