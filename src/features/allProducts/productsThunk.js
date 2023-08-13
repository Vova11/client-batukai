import customFetch from '../../utils/axios';

export const getAllProductsThunk = async (_, thunkAPI) => {
	const { page, search, published, featured, sort } =
		thunkAPI.getState().products;

	let url = `/products?published=${published}&featured=${featured}&sort=${sort}&page=${page}`;
	if (search) {
		url = url + `&search=${search}`;
	}
	try {
		const resp = await customFetch(url);
		return resp.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
