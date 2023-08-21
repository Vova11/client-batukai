import React, { useEffect, Fragment, useState } from 'react';
import Wrapper from '../assets/wrappers/FeaturedProducts';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../features/allProducts/allProductsSlice.js';
import Spinner from '../components/Dashboard/Spinner.js';
import { Product } from './';
import { getThreeRandomProducts } from '../utils/helpers';

const FeaturedProducts = () => {
	const { isLoading, featured_products } = useSelector(
		(store) => store.products
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	if (featured_products.length === 0) {
		return (
			<Wrapper className='section'>
				<div className='title'>
					<h2>featured products</h2>
					<div className='underline'></div>
				</div>
				<div className='section-center featured'>
					<h3>no products to display</h3>
				</div>
			</Wrapper>
		);
	}

	// Randomly select 3 products
	const randomFeaturedProducts = getThreeRandomProducts(featured_products);

	return (
		<Wrapper className='section'>
			<div className='title'>
				<h2>featured products</h2>
				<div className='underline'></div>
			</div>
			<div className='section-center featured'>
				{randomFeaturedProducts.map((product) => {
					return <Product key={`product-${product.id}`} {...product} />;
				})}
			</div>
			<Link to='/products' className='btn'>
				all products
			</Link>
		</Wrapper>
	);
};

export default FeaturedProducts;
