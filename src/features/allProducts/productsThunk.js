import customFetch from '../../utils/axios';
import {
	authHeader,
	checkForUnauthorizedResponse,
} from '../../utils/authHeader';

export const getAllProductsThunk = async (_, thunkAPI) => {
	const { page, search, published, featured, sort, company, nicotine } =
		thunkAPI.getState().products;

	let url = `/products?published=${published}&company=${company}&featured=${featured}&nicotine=${nicotine}&sort=${sort}&page=${page}`;
	if (search) {
		url = url + `&search=${search}`;
	}
	try {
		const resp = await customFetch.get(url);
		return resp.data;
	} catch (error) {
		// console.log(error.message);
		return thunkAPI.rejectWithValue(error.message);
	}
};

export const getThreeRandomProductsThunk = async (_, thunkAPI) => {
	try {
		const resp = await customFetch.get('products/get-random-products');
		return resp.data;
	} catch (error) {
		// console.log(error.message);
		return thunkAPI.rejectWithValue(error.message);
	}
};


export const updateProductFeaturedThunk = async (id, thunkAPI) => {
	try {
		const response = await customFetch.patch(
			`products/featured/${id}`,
			{},
			authHeader()
		);

		return response.data;
	} catch (error) {
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
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
