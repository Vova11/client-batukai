import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialFiltersState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
	isLoading: true,
	products: [],
	totalProducts: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	error: null,
	...initialFiltersState,
};

export const getAllProducts = createAsyncThunk(
	'allProducts/getProducts',
	async (_, thunkAPI) => {
		let url = '/products';
		try {
			const resp = await customFetch(url);
			return resp.data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

const allProductsSlice = createSlice({
	name: 'allProducts',
	initialState,
	reducers: {
		showLoading: (state) => {
			state.isLoading = true;
		},
		hideLoading: (state) => {
			state.isLoading = false;
		},
		handleToggle: (state, action) => {
			// Find the product in the state using the productId
			const product = state.products.find((p) => p.id === action.payload);
			if (product) {
				product.published = !product.published;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllProducts.fulfilled, (state, { payload }) => {
				state.products = payload.products;
				state.isLoading = false;
			})
			.addCase(getAllProducts.rejected, (state, { payload }) => {
				console.log('rejected');
				state.error = payload;
				state.isLoading = false;
				toast.error(payload);
			});
	},
});
export const { handleToggle, showLoading, hideLoading } =
	allProductsSlice.actions;
export default allProductsSlice.reducer;
