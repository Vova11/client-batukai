import React, { useState } from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart.js';
import { useSelector } from 'react-redux';
const ProductVariants = ({ product }) => {
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedVariant, setSelectedVariant] = useState({
		size: '',
		stock: 0,
	});
	const [quantity, setQuantity] = useState(1);

	const handleClick = (variant) => {
		setSelectedSize(variant.size);
		setSelectedVariant({
			size: variant.size,
			stock: variant.stock,
		});
	};

	// Function to sort the sizes in ascending order
	const sortSizes = (a, b) => {
		const sizeA = parseInt(a);
		const sizeB = parseInt(b);
		return sizeA - sizeB;
	};
	// Sort the unique sizes in ascending order
	const uniqueSizesWithStock = Array.from(
		new Set(
			product.variants.map(({ size, stock }) => ({
				size,
				stock,
			}))
		)
	).sort(sortSizes);

	return (
		<>
			{uniqueSizesWithStock.map((variant, index) => (
				<StyledButton
					key={index}
					onClick={() => handleClick(variant)}
					isSelected={selectedSize === variant.size}
				>
					{`${variant.size} - ${variant.stock}`}
				</StyledButton>
			))}

			<AddToCart
				item={{
					productId: product.id,
					colour: product.colour,
					size: selectedSize,
					quantity: quantity, // Pass the selected quantity to AddToCart
					stock: selectedVariant.stock,
				}}
				size={selectedVariant.size}
				quantity={quantity} // Pass the quantity to AddToCart for incrementing/decrementing
				setQuantity={setQuantity} // Pass the setQuantity function for updating the quantity
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
