import React from 'react';
import { useDispatch } from 'react-redux';
import ActionButtons from './ActionButtons.js';
import moment from 'moment';
import {
	updateProductPublished,
	updateProductFeatured,
} from '../../features/product/productSlice.js';

const ProductPage = (product) => {
	const dispatch = useDispatch();
	const date = moment(product.createdAt).format('MMM Do,YYYY');
	const { id, name, price, published, featured } = product;

	const handlePublishedToggle = (id) => {
		dispatch(updateProductPublished(id));
	};

	const handleFeaturedToggle = (id) => {
		dispatch(updateProductFeatured({ id }));
	};

	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			<td>{price}</td>
			<td>
				<label className='toggle-switch'>
					<input
						type='checkbox'
						checked={published}
						onChange={() => handlePublishedToggle({ id })}
					/>
					<span
						className={`slider ${published ? 'published' : 'unpublished'}`}
					></span>
				</label>
			</td>
			<td>
				<label className='toggle-switch'>
					<input
						type='checkbox'
						checked={featured}
						onChange={() => handleFeaturedToggle(id)}
					/>
					<span
						className={`slider ${featured ? 'featured' : 'notfeatured'}`}
					></span>
				</label>
			</td>

			<td>{date}</td>
			<td>
				<ActionButtons {...product} />
			</td>
		</tr>
	);
};

export default ProductPage;
