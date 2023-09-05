import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllProductsThunk } from './productsThunk';

const initialFiltersState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	published: 'all',
	featured: 'all',
	sort: 'latest',
	company: 'all',
	sortOptions: [
		'latest',
		'oldest',
		'a-z',
		'z-a',
		'price-lowest',
		'price-highest',
	],
};

const initialState = {
	isLoading: true,
	products: [],
	featured_products: [],
	totalProducts: 0,
	numOfPages: 1,
	currentPage: 1,
	page: 1,
	error: null,
	...initialFiltersState,
};

export const getAllProducts = createAsyncThunk(
	'allProducts/getProducts',
	getAllProductsThunk
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
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		clearFilters: (state) => {
			return { ...state, ...initialFiltersState };
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		clearAllProductsState: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllProducts.fulfilled, (state, { payload }) => {
				console.log('Hurraaa');
				console.log(payload.products);
				state.isLoading = false;
				state.products = payload.products;
				state.featured_products = payload.products.filter(
					(product) => product.published && product.featured
				);
				state.numOfPages = payload.numOfPages;
				state.totalProducts = payload.totalProducts;
			})
			.addCase(getAllProducts.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
				console.log(payload);
				toast.error(payload);
			});
	},
});
export const {
	// handleToggle,
	showLoading,
	hideLoading,
	clearFilters,
	handleChange,
	changePage,
	clearAllProductsState,
} = allProductsSlice.actions;
export default allProductsSlice.reducer;
