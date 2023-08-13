import { getAllProducts } from '../allProducts/allProductsSlice';

export const getFilteredProductsThunk = async (_, thunkAPI) => {
	try {
		console.log('getting filtered data');
		await thunkAPI.dispatch(getAllProducts());

		// You can access the products data from the state
		const allProducts = thunkAPI.getState().products;
		console.log('All products:', allProducts);
		return allProducts;
	} catch (error) {
		console.log('Some error:', error);
	}
};
