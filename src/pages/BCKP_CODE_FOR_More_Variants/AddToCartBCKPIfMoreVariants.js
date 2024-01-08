import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart, countCartTotal } from '../features/cart/cartSlice';
import AmountButtons from './AmountButtons';
import { Link } from 'react-router-dom';

const AddToCart = ({ item, quantity, setQuantity, size, hasStock }) => {
	const dispatch = useDispatch();
	const { cart } = useSelector((store) => store.cart);

	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cart));
	}, [cart]);

	const handleIncrement = () => {
		if (quantity < item.stock) {
			setQuantity(quantity + 1);
		} else {
			toast.warning('Cannot add more than available stock');
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleAddToCart = () => {
		// Check if the item with the same productId and size already exists in the cart
		if (!size) {
			toast.warning('Please select the size');
			return;
		}

		// Add the item to the cart
		dispatch(addToCart(item));
		dispatch(countCartTotal());
		toast.success('Item added to cart');
		setQuantity(1); // Reset quantity after adding to cart
	};

	return (
		<div>
			{hasStock === true ? (
				<>
					<div className='btn-container'>
						<AmountButtons
							increase={handleIncrement}
							decrease={handleDecrement}
							amount={quantity}
						/>
					</div>

					<br />

					<button className='btn margin-right-1' onClick={handleAddToCart}>
						Add to Cart
					</button>

					<Link to='/cart' className='btn'>
						Go to cart
					</Link>
				</>
			) : (
				<p>Product is out of stock</p>
			)}
		</div>
	);
};

export default AddToCart;
