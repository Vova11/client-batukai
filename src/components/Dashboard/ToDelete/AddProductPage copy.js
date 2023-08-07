import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormRow from '../../pages/FormRow';
import Col from 'react-bootstrap/Col';
import ImageList from './ImageList';
import MainImage from './MainImage';
import MainImageUpload from './MainImageUpload';
import MultipleImagesUpload from './MultipleImagesUpload';
import Spinner from './Spinner';
import {
	convertMapToArray,
	convertBase64,
} from '../../utils/imageUtils';

import {
	handleChange,
	createProduct,
	editProduct,
	addVariant,
	removeVariant,
	uploadMultipleProductImages,
	uploadSingleProductImage,
	uploadMainProductImage,
	clearValues,
	removeImage,
	addImages,
	removeImageFromImages,
	removeMainImage,
	setUserId,
} from '../../features/product/productSlice.js';

const AddProductPage = () => {
	const product = useSelector((store) => store.product);
	const { isLoading, isEditing, editProductId } = useSelector(
		(store) => store.product
	);
	const { user } = useSelector((store) => store.user);

	const dispatch = useDispatch();

	const handleInputChange = (event, index) => {
		const { name, value } = event.target;
		dispatch(handleChange({ name, value, index }));
	};

	const handleRemoveVariant = (index) => {
		dispatch(removeVariant(index));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const updatedProduct = { ...product, userId: user.id };
			if (isEditing) {
				dispatch(
					editProduct({
						productId: editProductId,
						product: updatedProduct,
					})
				);
				return;
			}
			dispatch(setUserId(user.id));
			dispatch(createProduct(updatedProduct));
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddVariant = () => {
		dispatch(addVariant());
	};

	//HANDLE IMAGES UPLOAD

	const handleImageUpload = async (uploadAction) => {
		try {
			const response = await dispatch(uploadAction);
			const imageUrl = response.payload;
			const responseConverted = convertMapToArray(imageUrl);
			// Update state using Redux reducers
			dispatch(addImages(responseConverted));
		} catch (error) {
			console.log(error);
		}
	};

	const uploadSingleImage = (base64) => {
		const uploadAction = uploadSingleProductImage(base64);
		handleImageUpload(
			uploadAction,
			() => {
				console.log('Image uploaded successfully');
			},
			(error) => {
				console.error(error);
			}
		);
	};

	const uploadMultipleImages = (images) => {
		const uploadAction = uploadMultipleProductImages(images);

		handleImageUpload(
			uploadAction,
			() => {
				console.log('Images uploaded successfully');
			},
			(error) => {
				console.error(error);
			}
		);
	};

	const uploadImage = async (event) => {
		const files = event.target.files;
		if (files.length === 1) {
			const base64 = await convertBase64(files[0]);
			uploadSingleImage(base64);
			return;
		}

		const base64s = [];
		for (var i = 0; i < files.length; i++) {
			var base = await convertBase64(files[i]);
			base64s.push(base);
		}
		uploadMultipleImages(base64s);
	};

	const uploadMainImage = async (event) => {
		try {
			if (product.image.length > 0) {
				for (const [publicId, url] of product.image) {
					await dispatch(removeImage(publicId));
					dispatch(removeMainImage(publicId));
				}
			}

			const file = event.target.files[0];
			const base64 = await convertBase64(file);

			await dispatch(uploadMainProductImage(base64));
			alert('Main image uploaded successfully');
		} catch (error) {
			console.error(error);
		}
	};

	const removeProductImage = async (publicId) => {
		try {
			await dispatch(removeImage(publicId));
			dispatch(removeImageFromImages(publicId));
		} catch (error) {
			console.error(error);
		}
	};

	const removeMainProductImage = async (publicId) => {
		try {
			await dispatch(removeImage(publicId));
			dispatch(removeMainImage(publicId));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h3>{product.isEditing ? 'Edit Product' : 'Add product'}</h3>
			<Form onSubmit={handleSubmit}>
				<Row className='mb-3'>
					<FormRow
						col='12'
						type='text'
						id='name'
						label='Name'
						name='name'
						value={product.name}
						onChange={handleInputChange}
					/>

					<FormRow
						col='12'
						type='textarea'
						id='description'
						label='Description'
						name='description'
						value={product.description}
						onChange={handleInputChange}
					/>

					<FormRow
						col='12'
						type='number'
						label='price'
						id='price'
						name='price'
						value={product.price}
						onChange={handleInputChange}
					/>
				</Row>

				{product.variants.map((variant, index) => (
					<div key={index}>
						<Row>
							<FormRow
								col='4'
								type='text'
								id={`color-${index}`}
								label='Color'
								name='color'
								value={variant.color}
								onChange={(e) => handleInputChange(e, index)}
							/>

							<FormRow
								col='4'
								type='text'
								id={`sizes-${index}`}
								name='sizes'
								label='Size'
								value={variant.sizes}
								onChange={(e) => handleInputChange(e, index)}
							/>

							<FormRow
								col='4'
								type='number'
								id={`stock-${index}`}
								name='stock'
								label='stock'
								value={variant.stock}
								onChange={(e) => handleInputChange(e, index)}
							/>

							{index !== 0 && (
								<Col>
									<button
										type='button'
										onClick={() => handleRemoveVariant(index)}
										className='mt-3 mb-3'
									>
										Remove Variant
									</button>
								</Col>
							)}
						</Row>
					</div>
				))}

				<Row>
					<MainImageUpload onChange={uploadMainImage} />
				</Row>
				<Row>
					<MultipleImagesUpload onChange={uploadImage} />
				</Row>
				<br />

				<button type='button' onClick={handleAddVariant}>
					Add Variant
				</button>
				<button type='button' onClick={() => dispatch(clearValues())}>
					Clear Values
				</button>
				<button type='submit'>Submit</button>
			</Form>
			<div>
				<MainImage
					images={product.image}
					removeImage={removeMainProductImage}
				/>
			</div>
			<div>
				<ImageList images={product.images} removeImage={removeProductImage} />
			</div>

			<div>{isLoading && <Spinner />}</div>
		</>
	);
};

export default AddProductPage;
