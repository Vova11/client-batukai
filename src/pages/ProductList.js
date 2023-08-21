import React, { Fragment, useEffect } from 'react';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import { getAllProducts } from '../features/allProducts/allProductsSlice';
import Spinner from '../components/Dashboard/Spinner';
import { Product, GridView, ListView } from './';
import { PageBtnContainer } from '../components/Dashboard';

const ProductsList = () => {
	const {
		isLoading,
		filtered_products: products,
		grid_view,
		numOfPages,
	} = useSelector((store) => store.filter);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	if (products.length === 0) {
		return (
			<div>
				<h5 style={{ textTransform: 'none' }}>
					Sorry, no products matched your search...
				</h5>
			</div>
		);
	}
	return (
		<>
			{grid_view === false ? (
				<ListView products={products} />
			) : (
				<GridView products={products} />
			)}
			{numOfPages > 1 && <PageBtnContainer />}
		</>
	);
};

export default ProductsList;
