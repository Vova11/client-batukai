import React from 'react';
import styled from 'styled-components';
import PageHero from './PageHero';
import aboutImg from '../assets/images/hero-bcg-2.jpeg';
const AboutPage = () => {
	return (
		<main>
			<PageHero title='about' />
			<Wrapper className='page section section-center'>
				<img src={aboutImg} alt='nice desk' />
				<article>
					<div className='title'>
						<h2>our story</h2>
						<div className='underline'></div>
					</div>
					<p>
						Having a baby is a life-changing experience, and it inspired me to
						start my own business. I noticed a gap in the market for
						high-quality, affordable baby shoes. As a new parent, I struggled to
						find shoes that were both stylish and practical for my little one. I
						wanted to create a brand that parents could trust to provide safe,
						comfortable footwear for their babies. I've always had a passion for
						fashion and design, and baby shoes seemed like the perfect niche to
						explore. Researching and sourcing materials for baby shoes has been
						a fascinating learning experience. I'm excited to offer a range of
						styles and colors to suit every baby's personality and style. Seeing
						little ones take their first steps in my shoes fills me with pride
						and joy. I wanted to create a business that would allow me to work
						from home and be flexible around my family commitments. The positive
						feedback and reviews from happy customers have been incredibly
						rewarding. I believe that investing in a good pair of baby shoes is
						important for their foot development and overall health. I hope that
						my business can help other parents feel confident and stylish while
						caring for their babies. I enjoy collaborating with other small
						businesses and supporting local communities. Running my own business
						has taught me valuable skills and given me a sense of purpose and
						fulfillment. I look forward to continuing to grow my brand and
						offering even more products for babies and young children.
					</p>
				</article>
			</Wrapper>
		</main>
	);
};
const Wrapper = styled.section`
	display: grid;
	gap: 4rem;
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
	.title {
		text-align: left;
	}
	.underline {
		margin-left: 0;
	}
	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
	}
`;
export default AboutPage;
