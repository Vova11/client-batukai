import React from 'react';
import styled from 'styled-components';
import PageHero from './PageHero';
import aboutImg from '../assets/images/hero-bcg-2.svg';
const AboutPage = () => {
	return (
		<main>
			<PageHero title='about' />
			<Wrapper className='page section section-center'>
				<article>
					<div className='title'>
						<h2>We love sweetvape</h2>

						<div className='underline'></div>
					</div>
					<p>
						Having a baby is a life-changing experience, and it inspired me to
						start my own business. I noticed a gap in the market for
						high-quality, affordable baby shoes. As a new parent, I struggled to
						find shoes that were both stylish and practical for my little one. I
						wanted to create a brand that parents could trust to provide safe,
						comfortable footwear for their babies.
					</p>
				</article>
			</Wrapper>
		</main>
	);
};
const Wrapper = styled.section`
	img {
		width: 100%;
		display: block;
		border-radius: var(--radius);
		height: 500px;
		object-fit: cover;
	}
	p {
		line-height: 2;
		max-width: 45em;
		margin: 0 auto;
		margin-top: 2rem;
		color: var(--clr-grey-5);
	}
	.underline {
		width: 6rem;
	}

	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
	}
`;
export default AboutPage;
