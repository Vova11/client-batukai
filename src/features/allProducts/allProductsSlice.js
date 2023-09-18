import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	getAllProductsThunk,
	updateProductFeaturedThunk,
	updateProductPublishedThunk,
} from './productsThunk';

const initialFiltersState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	published: 'all',
	featured: 'all',
	sort: 'latest',
	company: 'all',
	nicotine: 'all',
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

export const updateProductFeatured = createAsyncThunk(
	'products/featureProduct',
	updateProductFeaturedThunk
);

export const updateProductPublished = createAsyncThunk(
	'product/publishProduct',
	updateProductPublishedThunk
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
			console.log('Handle change in productsSlice');
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
				console.log('All PRODUTCTS SLICE');
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
			})
			.addCase(updateProductFeatured.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProductFeatured.fulfilled, (state, { payload }) => {
				const { featured, productId } = payload;

				// Find the index of the product in the array by its ID
				const productIndex = state.products.findIndex(
					(p) => p.id === +productId
				);
				console.log(productIndex);
				if (productIndex !== -1) {
					// Create a new copy of the product with the updated 'featured' value
					const updatedProduct = {
						...state.products[productIndex],
						featured: featured,
					};
					console.log(updatedProduct);
					// Create a new copy of the products array with the updated product
					const updatedProducts = [...state.products];
					updatedProducts[productIndex] = updatedProduct;

					return {
						...state,
						products: updatedProducts,
						isLoading: false,
					};
				}
				// If the product is not found, return the current state
				return state;
			})
			.addCase(updateProductFeatured.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(updateProductPublished.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(updateProductPublished.fulfilled, (state, { payload }) => {
				const { published, productId } = payload;

				// Find the index of the product in the array by its ID
				const productIndex = state.products.findIndex(
					(p) => p.id === +productId
				);

				if (productIndex !== -1) {
					// Create a new copy of the product with the updated 'featured' value
					const updatedProduct = {
						...state.products[productIndex],
						published: published,
					};
					console.log(updatedProduct);
					// Create a new copy of the products array with the updated product
					const updatedProducts = [...state.products];
					updatedProducts[productIndex] = updatedProduct;
					return {
						...state,
						products: updatedProducts,
						isLoading: false,
					};
				}
				// If the product is not found, return the current state
				return state;
			})
			.addCase(updateProductPublished.rejected, (state, { payload }) => {
				state.isLoading = false;
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
// Define the selector function to access state.products within the same file
export const selectProducts = (state) => state.products;
export default allProductsSlice.reducer;
