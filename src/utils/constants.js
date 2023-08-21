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
		text: 'We prioritize the safety of your children, which is why all our kids shoes are made from high-quality materials and undergo rigorous testing to meet the highest industry standards, giving you peace of mind while they play and explore.',
	},
	{
		id: 2,
		icon: <GiDiamondHard />,
		title: 'vision',
		text: `With our diverse collection of styles, colors, and sizes, you'll find the perfect pair of shoes to match your child's unique personality and outfit, allowing them to express themselves with confidence and style.'`,
	},
	{
		id: 3,
		icon: <GiStabbedNote />,
		title: 'history',
		text: `We understand that kids grow quickly, which is why we offer affordable prices without compromising on quality, making it easy and cost-effective for you to keep up with their changing shoe needs as they continue to grow.'`,
	},
];
