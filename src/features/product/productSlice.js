import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';
import {
	showLoading,
	hideLoading,
	getAllProducts,
} from '../allProducts/allProductsSlice';

const initialState = {
	isLoading: false,
	name: '',
	description: '',
	price: 0,
	userId: null,
	image: [],
	images: [],
	variants: [
		{
			color: '',
			size: '',
			stock: 0,
		},
	],
	isEditing: false,
	editProductId: '',
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
			console.log(resp.data);
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

/* Handle Images Upload */
export const uploadMultipleProductImages = createAsyncThunk(
	'product/uploadMultiple',
	async (images, thunkAPI) => {
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
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const uploadSingleProductImage = createAsyncThunk(
	'product/uploadImage',
	async (base64Image, thunkAPI) => {
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
			console.log(response);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const removeImage = createAsyncThunk(
	'product/removeImage',
	async (publicId, thunkAPI) => {
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
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

/* DELETE PRODUCT */
export const deleteProduct = createAsyncThunk(
	'product/deleteProduct',
	async (productId, thunkAPI) => {
		thunkAPI.dispatch(showLoading());
		try {
			const response = await customFetch.delete(`products/${productId}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			});
			// Return the response data if needed
			thunkAPI.dispatch(getAllProducts());
			return response.data.message;
		} catch (error) {
			thunkAPI.dispatch(hideLoading());
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

/* EDIT PRODUCT */
export const editProduct = createAsyncThunk(
	'product/editProduct',
	async ({ productId, product }, thunkAPI) => {
		try {
			const response = await customFetch.patch(
				`products/${productId}`,
				product,
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			// Return the response data if needed
			thunkAPI.dispatch(clearValues());
			return response.data;
		} catch (error) {
			thunkAPI.dispatch(hideLoading());
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const updateProductPublished = createAsyncThunk(
	'product/publishProduct',
	async ({ id, published }, thunkAPI) => {
		try {
			const response = await customFetch.patch(`products/${id}`, published, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			});
			// Return the response data if needed
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value, index } }) => {
			if (name === 'color' || name === 'size' || name === 'stock') {
				// Handle variant fields individually

				state.variants[index][name] = value;
			} else {
				state[name] = value;
			}
		},
		addVariant: (state) => {
			state.variants.push({
				color: '',
				size: '',
				stock: 0,
			});
		},
		removeVariant: (state, action) => {
			const index = action.payload;
			state.variants.splice(index, 1);
		},
		clearValues: () => {
			return initialState;
		},
		removeMainImage: (state, action) => {
			return {
				...state,
				image: [],
			};
		},
		removeImageFromImages: (state, action) => {
			const publicId = action.payload;

			state.images = state.images.filter(
				(image) => image.publicId !== publicId
			);
		},
		addImages: (state, action) => {
			// state.images = [...state.images, ...action.payload],
			state.images.push(...action.payload);
		},
		setUserId: (state, action) => {
			state.userId = action.payload;
		},
		sedEditProduct: (state, { payload }) => {
			return { ...state, isEditing: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				console.log('Fullfield');
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
			.addCase(uploadMultipleProductImages.fulfilled, (state, { payload }) => {
				console.log('Fullfield');
				state.isLoading = false;
				toast.success('Images successfully uploaded');
			})
			.addCase(uploadMultipleProductImages.rejected, (state, { payload }) => {
				console.log('Rejected');
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(uploadSingleProductImage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(uploadSingleProductImage.fulfilled, (state, action) => {
				console.log('Fullfield');
				state.image = [...state.image, action.payload];
				state.isLoading = false;
				toast.success('Image successfully uploaded');
			})
			.addCase(uploadSingleProductImage.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(removeImage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeImage.fulfilled, (state) => {
				console.log('Fullfield');
				state.isLoading = false;
			})
			.addCase(removeImage.rejected, (state, action) => {
				console.log('Rejected');
				state.isLoading = false;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteProduct.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				console.log(payload);
				toast.success(payload);
			})
			.addCase(deleteProduct.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(editProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editProduct.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success(payload.message);
			})
			.addCase(editProduct.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(updateProductPublished.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProductPublished.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success('product published');
			})
			.addCase(updateProductPublished.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			});
	},
});
export const {
	handleChange,
	clearValues,
	addVariant,
	removeVariant,
	addImages,
	removeImageFromImages,
	removeMainImage,
	setUserId,
	sedEditProduct,
} = productSlice.actions;
export default productSlice.reducer;
