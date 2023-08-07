import React, { useEffect } from 'react';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import { getAllProducts } from '../features/allProducts/allProductsSlice';
import Spinner from '../components/Dashboard/Spinner';
import { PageHero, ProductImages, ProductVariants } from './';

const Products = () => {
	const {
		isLoading,
		products,
		page,
		totalProducts,
		numOfPages,
		search,
		sort,
		published,
	} = useSelector((store) => store.products);
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(getAllProducts());
	}, [page, search, sort, published]);

	if (isLoading) {
		return <Spinner />;
	}
	

	if (products.length === 0) {
		return (
			<div>
				<h2>No product to display...</h2>
			</div>
		);
	}
	console.log(products);
	return <div>
		<PageHero product />
		{products.map((product) => {
			return <h2 key={product.id}>{product.name}</h2>
		})}
	</div>;
};

export default Products;
