import React, { Fragment, useEffect } from 'react';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import { getAllProducts } from '../features/allProducts/allProductsSlice';
import Spinner from '../components/Dashboard/Spinner';
import { Product, GridView, ListView } from './';
import { getFilteredProducts } from '../features/filter/filterSlice';
const ProductsList = () => {
	const {
		isLoading,
		filtered_products: products,
		grid_view,
	} = useSelector((store) => store.filter);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFilteredProducts());
	}, []);

	if (isLoading) {
		return <Spinner />;
	}
	console.log(products);
	if (products.length === 0) {
		return (
			<div>
				<h5 style={{ textTransform: 'none' }}>
					Sorry, no products matched your search...
				</h5>
			</div>
		);
	}
	if (grid_view === false) {
		return <ListView products={products} />;
	}
	return <GridView products={products} />;
};

export default ProductsList;
