import customFetch from '../../utils/axios';

export const getAllProductsThunk = async (_, thunkAPI) => {
	const { page, search, published, featured, sort, company } =
		thunkAPI.getState().products;

	let url = `/products?published=${published}&company=${company}&featured=${featured}&sort=${sort}&page=${page}`;
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
