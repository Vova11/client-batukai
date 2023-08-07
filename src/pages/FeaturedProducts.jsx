import React, { useEffect, Fragment, useState } from 'react';
import Wrapper from '../assets/wrappers/FeaturedProducts';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../features/allProducts/allProductsSlice.js';
import Spinner from '../components/Dashboard/Spinner.js';
import { Product } from './';


const FeaturedProducts = () => {
	const { isLoading, products } = useSelector((store) => store.products);
	const dispatch = useDispatch();
	const [isLoadingSpinner, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	if (isLoading) {
		return <Spinner />;
	}
	console.log(products);
	if (products.length === 0) {
		return (
			<Wrapper className='section'>
				<div className='title'>
					<h2>featured products</h2>
					<div className='underline'></div>
				</div>
				<div className='section-center featured'>
					<h3>no products to display</h3>
				</div>
			</Wrapper >
			
		)
	}

	const randomProducts = [...products]; // Create a copy of the products array

	// Shuffle the array using Fisher-Yates algorithm
	for (let i = randomProducts.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[randomProducts[i], randomProducts[j]] = [
			randomProducts[j],
			randomProducts[i],
		];
	}

	// Get the first two elements from the shuffled array
	const threeRandomProducts = randomProducts.slice(0, 3);

	return (
		<Wrapper className='section'>
			<div className='title'>
				<h2>featured products</h2>
				<div className='underline'></div>
			</div>
			<div className='section-center featured'>
				{threeRandomProducts.map((product) => {
					return (
						<Fragment key={product.id}>
							<Product key={`product-${product.id}`} {...product} />
						</Fragment>
					);
				})}
			</div>
			<Link to='/products' className='btn'>
				all products
			</Link>
		</Wrapper>
	);
};



export default FeaturedProducts;
