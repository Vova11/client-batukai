import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {
	createProductThunk,
	deleteProductThunk,
	uploadMultipleProductImagesThunk,
	removeImageThunk,
	editProductThunk,
	updateProductPublishedThunk,
	updateProductFeaturedThunk,
	getProductThunk,
} from './productThunk';

const initialState = {
	single_product: {},
	isLoading: false,
	name: '',
	company: '',
	colour: '',
	hexColourCode: '',
	description: '',
	price: 0,
	userId: null,
	published: false,
	featured: false,
	averageRating: 0,
	numberOfReviews: 0,
	images: [],
	variants: [
		{
			size: '',
			stock: 0,
		},
	],
	isEditing: false,
	editProductId: '',
	puffs: '',
	nicotineSaltQuantity: '',
	eLiquidVolume: '',
	battery: '',
	nicotine: '',
	multipack: '',
};

export const createProduct = createAsyncThunk(
	'product/createProduct',
	createProductThunk
);

/* Handle Images Upload */
export const uploadMultipleProductImages = createAsyncThunk(
	'product/uploadMultiple',
	uploadMultipleProductImagesThunk
);

export const removeImage = createAsyncThunk(
	'product/removeImage',
	removeImageThunk
);

/* DELETE PRODUCT */
export const deleteProduct = createAsyncThunk(
	'product/deleteProduct',
	deleteProductThunk
);

/* EDIT PRODUCT */
export const editProduct = createAsyncThunk(
	'product/editProduct',
	editProductThunk
);

export const updateProductPublished = createAsyncThunk(
	'product/publishProduct',
	updateProductPublishedThunk
);

export const updateProductFeatured = createAsyncThunk(
	'product/featureProduct',
	updateProductFeaturedThunk
);

export const getProduct = createAsyncThunk(
	'product/getProduct',
	getProductThunk
);

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value, index } }) => {
			if (name === 'size' || name === 'stock') {
				// Handle variant fields individually
				state.variants[index][name] = value;
			} else {
				state[name] = value;
			}
		},
		addVariant: (state) => {
			state.variants.push({
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
		removeImageFromImages: (state, action) => {
			const publicId = action.payload;

			state.images = state.images.filter(
				(image) => image.publicId !== publicId
			);
		},
		addImages: (state, action) => {
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
				state.isLoading = false;
				toast.success('Product created');
			})
			.addCase(createProduct.rejected, (state, { payload }) => {
				console.log('Rejected');
				state.isLoading = false;
				console.log(payload);
				toast.error(payload);
			})
			.addCase(uploadMultipleProductImages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(uploadMultipleProductImages.fulfilled, (state) => {
				console.log('Fullfield');
				state.isLoading = false;
				toast.success('Images successfully uploaded');
			})
			.addCase(uploadMultipleProductImages.rejected, (state) => {
				console.log('Rejected');
				state.isLoading = false;
				toast.error('Error');
			})
			.addCase(removeImage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeImage.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success('Image removed');
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
				// Set isLoading to false if necessary
				state.isLoading = false;
			})
			.addCase(updateProductPublished.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(updateProductFeatured.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProductFeatured.fulfilled, (state, { payload }) => {
				// Set isLoading to false if necessary
				state.isLoading = false;
			})
			.addCase(updateProductFeatured.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(getProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProduct.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.single_product = payload;
			})
			.addCase(getProduct.rejected, (state, { payload }) => {
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
	setUserId,
	sedEditProduct,
} = productSlice.actions;
export default productSlice.reducer;
