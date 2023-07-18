import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
import ProductPage from './ProductPage';
import { getAllProducts } from '../../features/allProducts/allProductsSlice.js';
import PageBtnContainer from './PageBtnContainer';

const ProductsContainer = () => {
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

	return (
		<div>
			<h5>
				{totalProducts} product {products.length > 1 && 's'} found
			</h5>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#id</th>
						<th>Name</th>
						<th>Price</th>
						<th>Published</th>
						<th>Featured</th>
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
			{numOfPages > 1 && <PageBtnContainer />}
		</div>
	);
};

export default ProductsContainer;
