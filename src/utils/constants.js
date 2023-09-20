import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
import { FaBehance, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const links = [
	{
		id: 1,
		text: 'About',
		url: '/about',
	},
	{
		id: 2,
		text: 'Products',
		url: '/products',
	},
	{
		id: 3,
		text: 'Brands',
		url: '/brands',
	},
	{
		id: 4,
		text: 'Kontak',
		url: '/contact',
	},
];

export const products_url = 'https://course-api.com/react-store-products';

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;

export const companies = ['rak', 'wanda'];

export const categories = ['boys', 'girls', 'unisex'];

export const services = [
	{
		id: 1,
		icon: <GiCompass />,
		title: 'mission',
		text: 'Our mission is to provide premium vaping experiences tailored to your preferences, helping you lead a healthier lifestyle through innovation and quality.',
	},
	{
		id: 2,
		icon: <GiDiamondHard />,
		title: 'vision',
		text: 'With a vision to become a leading name in the vaping industry, we aspire to set new standards by continually evolving and delivering products that enhance your well-being.',
	},
	{
		id: 3,
		icon: <GiStabbedNote />,
		title: 'history',
		text: `Our passion and dedication drive us to create a history of excellence in every product we offer, ensuring that every customer feels valued and satisfied.`,
	},
];
