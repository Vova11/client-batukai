import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const ProductImages = ({ images }) => {
	const [main, setMain] = useState('');

	useEffect(() => {
		const mainImage = images.find((image) => image.main === true);
		if (mainImage) {
			setMain(mainImage.url);
		}
	}, [images]);

	// Wait for the `main` image to be set before rendering it
	if (!main) {
		return null; // Render loading state or placeholder
	}

	return (
		<Wrapper>
			<img src={main} alt='' className='main' />

			<div className='gallery'>
				{images.map((image, index) => (
					<img
						src={image.url}
						alt=''
						key={index}
						className={`${image.url === main ? 'active' : ''}`}
						onClick={() => setMain(image.url)}
					/>
				))}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.main {
		height: 600px;
	}
	img {
		width: 100%;
		display: block;
		border-radius: var(--radius);
		object-fit: cover;
	}
	.gallery {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		column-gap: 1rem;
		img {
			height: 100px;
			cursor: pointer;
		}
	}
	.active {
		border: 2px solid var(--clr-primary-5);
	}
	@media (max-width: 576px) {
		.main {
			height: 300px;
		}
		.gallery {
			img {
				height: 50px;
			}
		}
	}
	@media (min-width: 992px) {
		.main {
			height: 500px;
		}
		.gallery {
			img {
				height: 75px;
			}
		}
	}
`;

export default ProductImages;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// const ProductImages = ({ image, images = [[]] }) => {
// 	console.log(images);
// 	const [main, setMain] = useState(images[0]);
// 	return (
// 		<Wrapper>
// 			<img src={main.url} alt='' className='main ' />
// 			<img src={image.url} alt='' className='main ' />
// 			<div className='gallery'>
// 				{images.map((image, index) => {
// 					return (
// 						<img
// 							src={image.url}
// 							alt=''
// 							key={index}
// 							className={`${image.url === main.url ? 'active' : null}`}
// 							onClick={() => setMain(images[index])}
// 						/>
// 					);
// 				})}
// 			</div>
// 		</Wrapper>
// 	);
// };

// const Wrapper = styled.section`
// 	.main {
// 		height: 600px;
// 	}
// 	img {
// 		width: 100%;
// 		display: block;
// 		border-radius: var(--radius);
// 		object-fit: cover;
// 	}
// 	.gallery {
// 		margin-top: 1rem;
// 		display: grid;
// 		grid-template-columns: repeat(5, 1fr);
// 		column-gap: 1rem;
// 		img {
// 			height: 100px;
// 			cursor: pointer;
// 		}
// 	}
// 	.active {
// 		border: 2px solid var(--clr-primary-5);
// 	}
// 	@media (max-width: 576px) {
// 		.main {
// 			height: 300px;
// 		}
// 		.gallery {
// 			img {
// 				height: 50px;
// 			}
// 		}
// 	}
// 	@media (min-width: 992px) {
// 		.main {
// 			height: 500px;
// 		}
// 		.gallery {
// 			img {
// 				height: 75px;
// 			}
// 		}
// 	}
// `;

// export default ProductImages;
