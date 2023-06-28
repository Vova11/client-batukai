import React from 'react';
import { Link } from 'react-router-dom';
import { BsPencilSquare, BsFillEyeFill } from 'react-icons/bs';
import { CiCircleRemove } from 'react-icons/ci';
import {
	deleteProduct,
	sedEditProduct,
} from '../../features/product/productSlice';
import { useDispatch } from 'react-redux';
const ActionButtons = (product) => {
	const { id, ...productData } = product;
	const dispatch = useDispatch();
	const showOff = () => {
		console.log(product);
	};
	return (
		<>
			<Link
				to='/dashboard/add-product'
				onClick={() =>
					dispatch(sedEditProduct({ editProductId: id, ...productData }))
				}
				style={{ marginRight: '10px', color: 'blue' }}
			>
				<BsPencilSquare size={20} />
			</Link>
			<Link onClick={showOff} style={{ marginRight: '10px', color: 'green' }}>
				<BsFillEyeFill size={20} />
			</Link>
			<Link
				onClick={() => dispatch(deleteProduct(product.id))}
				style={{ color: 'red' }}
			>
				<CiCircleRemove size={20} />
			</Link>
		</>
	);
};

export default ActionButtons;
