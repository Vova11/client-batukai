import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ActionButtons from './ActionButtons.js';
import moment from 'moment';
import { updateProductPublished } from '../../features/product/productSlice.js';

const ProductPage = (product) => {
	const dispatch = useDispatch();
	const date = moment(product.createdAt).format('MMM Do,YYYY');
	const { id, name, price, published } = product;

	const handlePublishedToggle = (id, published) => {
		dispatch(updateProductPublished({ id, published }));
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
						checked={product.published}
						onChange={() => handlePublishedToggle(id, published)}
					/>
					<span className='slider'></span>
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
