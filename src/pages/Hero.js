import { Link } from 'react-router-dom';
import heroBcg from '../assets/images/hero-bcg.svg';
import heroBcg2 from '../assets/images/hero-bcg-2.svg';
import Wrapper from '../assets/wrappers/LandingPage';
const Hero = () => {
	return (
		<Wrapper className='section-center'>
			<article className='content'>
				<h1>
					ShoeBox <br />
				</h1>
				<p>
					Our e-shop offers a wide range of kids shoes that are specifically
					designed to provide utmost comfort and support for growing feet,
					ensuring healthy foot development for your little ones.
				</p>
				<Link to='/products' className='btn'>
					Shop now
				</Link>
			</article>
			<article className='img-container'>
				<img src={heroBcg} alt='nice table' className='main-img' />
				<img src={heroBcg2} alt='person working' className='accent-img' />
			</article>
		</Wrapper>
	);
};

export default Hero;
