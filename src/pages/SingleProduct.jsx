import React, { useEffect, useState  } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../features/product/productSlice';
import Spinner from '../components/Dashboard/Spinner.js';
import { formatPrice } from '../utils/helpers';
import { PageHero, ProductImages, ProductVariants } from './';
const SingleProduct = () => {
	const { productId } = useParams();
	const { isLoading, single_product } = useSelector((store) => store.product);

	const dispatch = useDispatch();
	// Loading state to track whether single_product is being fetched
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		dispatch(getProduct(productId)).then(() => {
		  // After the getProduct action is fulfilled, set loading to false
		  setLoading(false);
		});
	  }, [dispatch, productId]);
	
	  if (isLoading || loading || !single_product) {
		// Show a loading spinner or placeholder while loading
		return <Spinner />;
	  }

	let parsedData = null;
	let allImages = [];

	if (single_product && single_product.image && single_product.image.length > 0) {
		console.log('pico');
		parsedData = JSON.parse(single_product.image);
		allImages = single_product.images
		  .map((image) => ({
			...image,
			main: false,
		  }))
		  .concat({
			main: true,
			publicId: parsedData['publicId'],
			url: parsedData['url'],
		  });
	 
	  }
	

	if (!single_product) {
		return <Spinner />; // Add another conditional rendering for loading state
	}

	const { name, price, description, id } = single_product;
	
	

	return (
		<Wrapper>
			<PageHero title={name} product />
			<div className='section section-center page'>
				<Link to='/products' className='btn'>
					back to products
				</Link>
				<div className='product-center'>
				{single_product?.image?.length > 0 ? (
          <ProductImages images={allImages} />
        ) : (
          // Render a placeholder image if single_product.images is empty or undefined
          <img src='placeholder_image_url' alt='Placeholder' />
        )}
					<section className='content'>
						<h2>{name}</h2>

						<h5 className='price'>{formatPrice(price)}</h5>
						<p className='desc'>{description}</p>
						<p className='info'>
							<span>Available : </span>
							stock
						</p>
						<p className='info'>
							<span>SKU :</span>
							{id}
						</p>
						<p className='info'>
							<span>Brand :</span>
							Company
						</p>
						<p className='info'>
							<span>Select Size:</span>
							<ProductVariants variants={single_product?.variants} />
						</p>
						<hr />
					</section>
					
					
						
					
				</div>
			</div>
		</Wrapper>
	);
};

export default SingleProduct;

const Wrapper = styled.main`
	.product-center {
		display: grid;
		gap: 4rem;
		margin-top: 2rem;
	}
	.price {
		color: var(--clr-primary-5);
	}
	.desc {
		line-height: 2;
		max-width: 45em;
	}
	.info {
		text-transform: capitalize;
		width: 300px;
		display: grid;
		grid-template-columns: 125px 1fr;
		span {
			font-weight: 700;
		}
	}
	@media (min-width: 992px) {
		.product-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}
		.price {
			font-size: 1.25rem;
		}
	}
`;

// import { useEffect } from 'react';
// import styled from 'styled-components';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { useProductsContext } from '../context';
// import { single_product_url as url } from '../utils/constants';
// import { formatPrice } from '../utils/helpers';
// import { Loading, Hero, PageHero } from '../pages';
// import { AddToCart, ProductImages, Stars } from './';
// import Error from './Error';

// const SingleProduct = () => {
// 	const { productId } = useParams();
// 	const navigate = useNavigate();
// 	const {
// 		single_product_loading: loading,
// 		single_product_error: error,
// 		single_product: product,
// 		fetchSingleProduct,
// 	} = useProductsContext();

// 	useEffect(() => {
// 		fetchSingleProduct(`${url}${productId}`);
// 	}, [productId]);

// 	useEffect(() => {
// 		if (error) {
// 			setTimeout(() => {
// 				navigate('/');
// 			}, 3000);
// 		}
// 	});

// 	if (loading) {
// 		return <Loading />;
// 	}
// 	if (error) {
// 		return <Error />;
// 	}
// 	const {
// 		name,
// 		price,
// 		description,
// 		stock,
// 		stars,
// 		reviews,
// 		id: sku,
// 		company,
// 		images,
// 	} = product;

// 	return (
// 		<Wrapper>
// 			<PageHero title={name} product />
// 			<div className='section section-center page'>
// 				<Link to='/products' className='btn'>
// 					back to products
// 				</Link>
// 				<div className='product-center'>
// 					<ProductImages images={images} />
// 					<section className='content'>
// 						<h2>{name}</h2>
// 						<Stars stars={stars} reviews={reviews} />
// 						<h5 className='price'>{formatPrice(price)}</h5>
// 						<p className='desc'>{description}</p>
// 						<p className='info'>
// 							<span>Available : </span>
// 							{stock > 0 ? 'In stock' : 'out of stock'}
// 						</p>
// 						<p className='info'>
// 							<span>SKU :</span>
// 							{sku}
// 						</p>
// 						<p className='info'>
// 							<span>Brand :</span>
// 							{company}
// 						</p>
// 						<hr />
// 						{stock > 0 && <AddToCart product={product} />}
// 					</section>
// 				</div>
// 			</div>
// 		</Wrapper>
// 	);
// };

// const Wrapper = styled.main`
// 	.product-center {
// 		display: grid;
// 		gap: 4rem;
// 		margin-top: 2rem;
// 	}
// 	.price {
// 		color: var(--clr-primary-5);
// 	}
// 	.desc {
// 		line-height: 2;
// 		max-width: 45em;
// 	}
// 	.info {
// 		text-transform: capitalize;
// 		width: 300px;
// 		display: grid;
// 		grid-template-columns: 125px 1fr;
// 		span {
// 			font-weight: 700;
// 		}
// 	}
// 	@media (min-width: 992px) {
// 		.product-center {
// 			grid-template-columns: 1fr 1fr;
// 			align-items: center;
// 		}
// 		.price {
// 			font-size: 1.25rem;
// 		}
// 	}
// `;

// export default SingleProduct;

// // const SingleProduct = () => {
// // 	const { addToCart } = useCartContext();
// // 	const { selectedProduct, setSelectedProduct } = useProductsContext();

// // 	const { productId } = useParams();
// // 	useEffect(() => {
// // 		setSelectedProduct(productId);
// // 	}, []);

// // 	if (!selectedProduct) {
// // 		return <div>Loading...</div>;
// // 	}

// // 	const {
// // 		id,
// // 		image,
// // 		title,
// // 		type,
// // 		price,
// // 		company,
// // 		category,
// // 		amount,
// // 		description,
// // 	} = selectedProduct;

// // 	return (
// // 		<article className='cart-item'>
// // 			<img src={image} alt={title} />
// // 			<div>
// // 				<h5>{title}</h5>
// // 				<ul>
// // 					<li>Category: {category}</li>
// // 					<li>Company: {company}</li>
// // 					<li>{company}</li>
// // 					<li>{type}</li>
// // 					<li>{category}</li>
// // 					<li>{description}</li>
// // 				</ul>
// // 				<span className='item-price'>${price}</span>
// // 				{/* Add to cart */}
// // 				<button
// // 					className='btn btn-hipster'
// // 					onClick={() => addToCart(product, amount)}
// // 				>
// // 					Add to cart
// // 				</button>
// // 				<Link to='/products'>Back to Products</Link>
// // 			</div>
// // 		</article>
// // 	);
// // };

// // export default SingleProduct;
