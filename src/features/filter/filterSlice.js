import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	showLoading,
	hideLoading,
	getAllProducts,
} from '../allProducts/allProductsSlice';
import { logDOM } from '@testing-library/react';

const initialState = {
	isLoading: false,
	filtered_products: [],
	all_products: [],
	grid_view: true,
	sort: 'price-lowest',
	uniqueCompanies: [],
	filters: {
		text: '',
		company: 'All',
		category: 'All',
		colour: '',
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
};

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
			console.log(state.all_products.length);
			console.log(state.filtered_products.length);
			const { name, value } = action.payload;

			// Update state.filters with the new value for the specified filter
			state.filters[name] = value;

			// Convert value to number for numerical fields
			const numericalFields = ['min_price', 'max_price', 'price'];
			if (numericalFields.includes(name)) {
				state.filters[name] = Number(value);
			}

			// Apply the filterProducts logic here
			let updatedFilteredProducts = state.all_products.filter((product) => {
				// Check if the product name contains the text filter value
				const nameMatch = product.name
					.toLowerCase()
					.includes(state.filters.text.toLowerCase());

				// Check if the product belongs to the selected company
				const companyMatch =
					state.filters.company === 'all' ||
					product.company === state.filters.company;

				// Check if the product's price is within the specified range
				const priceMatch = product.price <= state.filters.price;

				return nameMatch && companyMatch && priceMatch;
			});

			// Update the filtered products with the updatedFilteredProducts
			state.filtered_products = updatedFilteredProducts;
		},

		clearFilters: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.isLoading = false;

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
