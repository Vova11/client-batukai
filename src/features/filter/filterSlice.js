import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	showLoading,
	hideLoading,
	getAllProducts,
} from '../allProducts/allProductsSlice';

const initialState = {
	isLoading: false,
	filtered_products: [],
	all_products: [],
	grid_view: true,
	totalProducts: 0,
	numOfPages: 1,
	currentPage: 1,
	page: 1,
	sort: 'price-lowest',
	uniqueCompanies: [],
	filters: {
		text: '',
		company: 'all',
		category: 'all',
		colour: '',
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
};

export const getFilterProducts = createAsyncThunk(
	'filter/getFilterProducts',
	async ({ filters, sort }, thunkAPI) => {
		try {
			const productsResponse = await thunkAPI.dispatch(
				getAllProducts({ filters, sort })
			);
			return productsResponse;
		} catch (error) {
			throw error;
		}
	}
);

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setGridView: (state) => {
			state.grid_view = true;
		},
		setListView: (state) => {
			state.grid_view = false;
		},
		updateSort: (state, action) => {
			state.sort = action.payload;
			// Sort the products based on the selected sort value
			let tempProducts = [...state.filtered_products];
			if (action.payload === 'price-lowest') {
				tempProducts.sort((a, b) => a.price - b.price);
			} else if (action.payload === 'price-highest') {
				tempProducts.sort((a, b) => b.price - a.price);
			} else if (action.payload === 'name-a') {
				tempProducts.sort((a, b) => a.name.localeCompare(b.name));
			} else if (action.payload === 'name-z') {
				tempProducts.sort((a, b) => b.name.localeCompare(a.name));
			}
			// Update filtered_products with the sorted array
			state.filtered_products = tempProducts;
		},
		updateFilters: (state, action) => {
			console.log('updajting');
			const { name, value } = action.payload;
			console.log('tu si');

			// Update state.filters with the new value for the specified filter
			state.filters[name] = value;

			// Convert value to number for numerical fields
			const numericalFields = ['min_price', 'max_price', 'price'];
			if (numericalFields.includes(name)) {
				state.filters[name] = Number(value);
			}
			const { text, category, company, color, price, shipping } = state.filters;
			let tempProducts = [...state.all_products];
			// Apply the filter logic based on the filter name

			// filter by text
			if (text) {
				tempProducts = [...tempProducts].filter((product) =>
					product.name.toLowerCase().startsWith(text.toLowerCase())
				);
			}

			if (company !== 'all') {
				tempProducts = [...tempProducts].filter(
					(product) => company === 'all' || product.company === company
				);
			}

			tempProducts = tempProducts.filter((product) => product.price <= price);

			state.filtered_products = tempProducts;
		},
		clearFilters: (state) => {
			state.filtered_products = state.all_products;
			const updatedFilters = {
				...state.filters,
				company: 'all',
				category: 'all',
				price: state.filters.max_price,
			};
			// Update state.filters with the new filters object
			state.filters = updatedFilters;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				console.log('tu si ko');
				console.log(action.payload);
				// pagination
				state.totalProducts = action.payload.totalProducts;
				state.numOfPages = action.payload.numOfPages;
				const onlyPublishedProducts = action.payload.products.filter(
					(product) => product.published === true
				);

				// Compute unique companies, colors, and categories
				const uniqueCompanies = [
					...new Set(onlyPublishedProducts.map((product) => product.company)),
				];

				state.all_products = [...onlyPublishedProducts];
				state.filtered_products = [...onlyPublishedProducts];
				state.uniqueCompanies = ['all', ...uniqueCompanies];
				let maxPrice = onlyPublishedProducts.map((p) => p.price);
				maxPrice = Math.max(...maxPrice);
				const updatedFilters = {
					...state.filters,
					max_price: maxPrice,
					price: maxPrice,
				};
				// Update state.filters with the new filters object
				state.filters = updatedFilters;
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				state.isLoading = false;
			})
			.addCase(getAllProducts.pending, (state, action) => {
				state.isLoading = true;
			});
	},
});

export const {
	setGridView,
	setListView,
	updateSort,
	updateFilters,
	clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
