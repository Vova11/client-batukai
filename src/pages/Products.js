import React from 'react';
import { PageHero, ProductList, Filters, Sort } from './';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Products = () => {
	return (
		<main>
			<PageHero product />
			<Container>
				<Row>
					<Col xs='12' lg='3'>
						<Filters />
					</Col>
					<Col xs lg='9'>
						<Sort />
						<ProductList />
					</Col>
				</Row>
			</Container>
		</main>
	);
};

export default Products;

// {
// 	products.map((product) => {
// 		return <Product key={`product-${product.id}`} {...product} />;
// 	});
// }
