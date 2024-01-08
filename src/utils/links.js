import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { AiFillEuroCircle } from 'react-icons/ai';

const links = [
	{ id: 1, text: 'stats', path: 'stats', icon: <IoBarChartSharp /> },
	{ id: 2, text: 'all products', path: 'all-products', icon: <MdQueryStats /> },
	{ id: 3, text: 'add product', path: 'add-product', icon: <FaWpforms /> },
	{ id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
	{ id: 5, text: 'dashboard', path: '/dashboard', icon: <ImProfile /> },
	{ id: 6, text: 'Orders', path: 'orders', icon: <AiFillEuroCircle /> },
  { id: 7, text: 'Brands', path: 'brands', icon: <AiFillEuroCircle /> },
];

export default links;
