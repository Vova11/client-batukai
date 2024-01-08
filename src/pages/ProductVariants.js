import React, { useState } from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart.js';
import { useSelector } from 'react-redux';

const ProductVariants = ({ product, hasStock }) => {
	const selectedVariant = product.variants[0];
	const [quantity, setQuantity] = useState(1);

	return (
		<>
			<AddToCart
				item={{
					productId: product.id,
					colour: product.colour,
					name: product.name,
					price: product.price,
					image: product.images[0].url,
					company: product.company.name,
					quantity: quantity, // Pass the selected quantity to AddToCart
					stock: selectedVariant.stock,
					size: selectedVariant.size,
				}}
				quantity={quantity} // Pass the quantity to AddToCart for incrementing/decrementing
				setQuantity={setQuantity} // Pass the setQuantity function for updating the quantity
				hasStock={hasStock}
			/>
		</>
	);
};

export default ProductVariants;

const StyledButton = styled.button`
	background-color: ${(props) =>
		props.isSelected ? 'var(--clr-primary-5)' : '#fff'};
	color: ${(props) => (props.isSelected ? '#fff' : '#000')};
	border: ${(props) =>
		props.isSelected ? '1px solid var(--clr-primary-5)' : '1px solid #ccc'};
	padding: 5px 10px;
	border-radius: 5px;
	cursor: pointer;
	margin: 5px;
`;
