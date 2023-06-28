import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
import ProductPage from './ProductPage';
import { getAllProducts } from '../../features/allProducts/allProductsSlice.js';

const ProductsContainer = () => {
	const { isLoading, products } = useSelector((store) => store.products);
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
				<h2>No product to display...</h2>
			</div>
		);
	}
	console.log('Products');
	console.log(products);

	return (
		<div>
			<h5>Products</h5>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#id</th>
						<th>Name</th>
						<th>Price</th>
						<th>Published</th>
						<th>Created At</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => {
						return <ProductPage key={product.id} {...product} />;
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default ProductsContainer;
