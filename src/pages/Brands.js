import React from 'react';
import { PageHero } from './';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
const Brands = () => {
	const { companies } = useSelector((store) => store.filter);
	console.log(companies);
	return (
		<main>
			<PageHero title='Brands' />
			<Container className='section section-center'>
				<Row>
					<h2 className='mb-4'>Brands</h2>
					{companies.map((company, index) => (
						<ListGroup.Item key={index}>{company}</ListGroup.Item>
					))}
				</Row>
			</Container>
		</main>
	);
};

export default Brands;
