import Wrapper from '../assets/wrappers/FeaturedProducts';
import { Link } from 'react-router-dom';
const FeaturedProducts = () => {
	return (
		<Wrapper className='section'>
			<div className='title'>
				<h2>featured products</h2>
				<div className='underline'></div>
			</div>
			<div className='section-center featured'>
				<h2>Products here</h2>
			</div>
			<Link to='/products' className='btn'>
				all products
			</Link>
		</Wrapper>
	);
};

export default FeaturedProducts;
