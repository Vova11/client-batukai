import { Link } from 'react-router-dom';
import heroBcg from '../assets/images/hero-bcg.svg';
import heroBcg2 from '../assets/images/hero-bcg-2.svg';
import Wrapper from '../assets/wrappers/LandingPage';
const Hero = () => {
	return (
		<Wrapper className='section-center'>
			<article className='content'>
				<h1>
					ShoeBoxLive <br />
				</h1>
				<p>
					Unleash your taste buds and elevate your vaping experience with our
					premium e-liquids. Dive into a world of rich flavors, unbeatable
					quality, and pure vaping satisfaction. Why settle for ordinary when
					you can vape extraordinary?
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
