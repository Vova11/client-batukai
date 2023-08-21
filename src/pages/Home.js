import React from 'react';
import { FeaturedProducts, Services, Contact, Hero } from './';
const Home = () => {
	return (
		<>
			<main>
				<Hero />
				<FeaturedProducts />
				<Services />
				<Contact />
			</main>
		</>
	);
};

export default Home;
