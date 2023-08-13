import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../features/cart/cartSlice';
import AmountButtons from './AmountButtons';
import { Link } from 'react-router-dom';
const AddToCart = ({ item, quantity, setQuantity, size }) => {
	const dispatch = useDispatch();
	const { items } = useSelector((store) => store.cart);

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

		const itemExists = items.some(
			(cartItem) =>
				cartItem.productId === item.productId && cartItem.size === item.size
		);

		if (itemExists) {
			// Do nothing if the item already exists in the cart
			toast.warning('Item is already in cart');
			return;
		}

		// Add the item to the cart
		dispatch(addToCart(item));
		toast.success('Item added to cart');
		setQuantity(1); // Reset quantity after adding to cart
	};

	return (
		<div>
			<div>
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
			</div>
		</div>
	);
};

export default AddToCart;
