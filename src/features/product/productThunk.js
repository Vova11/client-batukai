import customFetch from '../../utils/axios';
import {
	showLoading,
	hideLoading,
	getAllProducts,
} from '../allProducts/allProductsSlice';
import { clearValues } from './productSlice';

import {
	authHeader,
	checkForUnauthorizedResponse,
} from '../../utils/authHeader';

export const createProductThunk = async (product, thunkAPI) => {
	try {
		const resp = await customFetch.post('/products', product, authHeader());
		thunkAPI.dispatch(clearValues());
		return resp.data;
	} catch (error) {
		checkForUnauthorizedResponse(error, thunkAPI);
	}
};
export const deleteProductThunk = async (productId, thunkAPI) => {
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
};

export const uploadMultipleProductImagesThunk = async (images, thunkAPI) => {
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
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const removeImageThunk = async (
	{ publicId, productId, source },
	thunkAPI
) => {
	try {
		const response = customFetch.post(
			'products/removeImage',
			{
				publicId,
				productId,
				source,
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
		console.log(error);
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const editProductThunk = async ({ id, product }, thunkAPI) => {
	try {
		const response = await customFetch.patch(
			`products/${id}`,
			product,
			authHeader()
		);

		// Return the response data if needed
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error) {
		thunkAPI.dispatch(hideLoading());
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const updateProductPublishedThunk = async (id, thunkAPI) => {
	try {
		const response = await customFetch.patch(
			`products/publish/${id}`,
			{},
			authHeader()
		);
		// Return the response data if needed
		thunkAPI.dispatch(getAllProducts());
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const updateProductFeaturedThunk = async (id, thunkAPI) => {
	try {
		const response = await customFetch.patch(
			`products/featured/${id}`,
			{},
			authHeader()
		);

		// Return the response data if needed
		thunkAPI.dispatch(getAllProducts());
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const getProductThunk = async (id, thunkAPI) => {
	try {
		const response = await customFetch.get(`products/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});

		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
