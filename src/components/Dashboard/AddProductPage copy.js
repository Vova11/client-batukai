import { useState } from 'react';
import axios from 'axios';
import assets from '../../assets/assets.gif';
import { useSelector, useDispatch } from 'react-redux';
import { user } from '../../features/user/userSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormRow from '../../pages/FormRow';
import ImageList from './ImageList';
import MainImageUpload from './MainImageUpload';
import MultipleImagesUpload from './MultipleImagesUpload';
import Spinner from './Spinner';
import Col from 'react-bootstrap/Col';

import {
	handleChangeState,
	clearValues,
	createProduct,
	uploadMultipleProductImages,
	uploadSingleProductImage,
	removeImage,
} from '../../features/product/productSlice.js';
import customFetch from '../../utils/axios';

const AddProductPage = () => {
	const { isEditing } = useSelector((store) => store.product);
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [url, setUrl] = useState('');

	const [product, setProduct] = useState({
		name: '',
		description: '',
		price: 0,
		userId: user.id,
		image: [],
		images: [],
		variants: [
			{
				color: '',
				sizes: '',
				stock: 0,
			},
		],
	});

	const handleProduct = (e) => {
		const { name, value } = e.target;
		setProduct((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleVariantChange = (e, index) => {
		const { name, value } = e.target;
		const variants = [...product.variants]; // create a copy of the colors array
		variants[index] = { ...variants[index], [name]: value }; // update the color object at the specified index
		setProduct({ ...product, variants }); // update the product object with the updated colors array
	};

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const convertMapToArray = (data) => {
		const images = new Map(Object.entries(data));
		return Array.from(images);
	};

	const handleImageUpload = async (uploadAction, onSuccess, onError) => {
		setLoading(true);

		try {
			const response = await dispatch(uploadAction);
			const imageUrl = response.payload;
			const responseConverted = convertMapToArray(imageUrl);

			setUrl((prevUrl) => [...prevUrl, ...responseConverted]);
			setProduct((prevProduct) => ({
				...prevProduct,
				images: [...prevProduct.images, ...responseConverted],
			}));

			onSuccess();
		} catch (error) {
			onError(error);
		} finally {
			setLoading(false);
		}
	};

	const uploadSingleImage = (base64) => {
		const uploadAction = uploadSingleProductImage(base64);
		console.log(uploadAction);
		handleImageUpload(
			uploadAction,
			() => {
				alert('Image uploaded successfully');
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
				alert('Images uploaded successfully');
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
			console.log(base64);
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

	const findInMap = (map, key) => {
		return map.get(key);
	};

	const uploadMainImage = async (event) => {
		setLoading(true);
		if (product.image.size > 0) {
			for (const [publicId, url] of product.image) {
				await dispatch(removeImage(publicId));
				product.image.delete(publicId); // Remove the entry from the Map
			}
		}

		const file = event.target.files[0];
		try {
			const base64 = await convertBase64(file);

			const res = await customFetch.post(
				'/products/uploadImage',
				{
					image: base64,
				},
				{
					withCredentials: true,
				}
			);

			const imageUrl = res.data;
			const responseConverted = convertMapToArray(imageUrl);

			setProduct((prevProduct) => ({
				...prevProduct,
				image: new Map([...prevProduct.image, ...responseConverted]), // Add the new entry to the existing Map
			}));
			setLoading(false);
			alert('Main image uploaded successfully');
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddVariant = () => {
		setProduct({
			...product,
			variants: [...product.variants, { color: '', sizes: '', stock: '' }],
		});
	};

	const handleRemoveVariant = (index) => {
		const newVariants = [...product.variants];
		newVariants.splice(index, 1);
		setProduct({ ...product, variants: newVariants });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(createProduct(product));
		} catch (error) {
			console.log(error);
		}
	};
	const removeProductImage = (publicId) => {
		dispatch(removeImage(publicId))
			.unwrap()
			.then(() => {
				setProduct((prevProduct) => {
					const updatedImages = new Map(prevProduct.images);
					updatedImages.delete(publicId);
					return {
						...prevProduct,
						images: updatedImages,
					};
				});

				setUrl((prevUrl) => {
					const updatedImages = new Map(prevUrl);
					updatedImages.delete(publicId);
					return updatedImages;
				});

				alert('Image removed successfully');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const showMainImage = () => {
		return (
			<ul>
				{[...product.image].map(([publicId, url]) => (
					<li key={publicId}>
						<a href={url} target='_blank' rel='noopener noreferrer'>
							{url}
						</a>
						<button type='button' onClick={() => removeProductImage(publicId)}>
							Remove image
						</button>
					</li>
				))}
			</ul>
		);
	};

	return (
		<>
			<h3>{isEditing ? 'Edit Product' : 'Add product'}</h3>

			<Form onSubmit={handleSubmit}>
				<Row className='mb-3'>
					<FormRow
						col='12'
						type='text'
						id='name'
						label='Name'
						name='name'
						value={product.name}
						onChange={handleProduct}
					/>

					<FormRow
						col='12'
						type='textarea'
						id='description'
						label='Description'
						name='description'
						value={product.description}
						onChange={handleProduct}
					/>

					<FormRow
						col='12'
						type='number'
						label='price'
						id='price'
						name='price'
						value={product.price}
						onChange={handleProduct}
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
								onChange={(e) => handleVariantChange(e, index)}
							/>

							<FormRow
								col='4'
								type='text'
								id={`sizes-${index}`}
								name='sizes'
								label='Size'
								value={variant.sizes}
								onChange={(e) => handleVariantChange(e, index)}
							/>

							<FormRow
								col='4'
								type='number'
								id={`stock-${index}`}
								name='stock'
								label='stock'
								value={variant.stock}
								onChange={(e) => handleVariantChange(e, index)}
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

				<button type='submit'>Submit</button>
			</Form>
			<div>{showMainImage()}</div>
			<div>
				{url && <ImageList images={url} removeImage={removeProductImage} />}
			</div>
			<div>{loading && <Spinner />}</div>
		</>
	);
};

export default AddProductPage;

// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import FormRow from '../../pages/FormRow';
// // import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { useSelector, useDispatch } from 'react-redux';
// import { user } from '../../features/user/userSlice';
// import {
// 	handleChangeState,
// 	clearValues,
// 	createProduct,
// } from '../../features/product/productSlice.js';

// const AddProductPage = () => {
// 	const [validated, setValidated] = useState(false);
// 	const { user } = useSelector((store) => store.user);

// 	const {
// 		isLoading,
// 		name,
// 		description,
// 		price,
// 		featured,
// 		image,
// 		published,
// 		freeShipping,
// 		averageRating,
// 		numberOfReviews,
// 		isEditing,
// 		editProduct,
// 	} = useSelector((store) => store.product);

// 	// const {
// 	// 	control,
// 	// 	handleSubmit,
// 	// 	setValue,
// 	// 	formState: { errors },
// 	// } = useForm();

// 	const dispatch = useDispatch();

// 	const handleChangeInput = (e) => {
// 		const name = e.target.name;
// 		const value = e.target.value;
// 		dispatch(handleChangeState({ name, value }));
// 	};

// 	const onSubmit = (e) => {
// 		e.preventDefault();
// 		if (!name || !description || !price) {
// 			toast.error('Please fill out all fields');
// 			return;
// 		}
// 		const product = {
// 			name,
// 			description,
// 			price,
// 			userId: user.id,
// 		};
// 		dispatch(createProduct(product));
// 	};

// 	return (
// 		<div>
// 			<h3>{isEditing ? 'Edit Product' : 'Add product'}</h3>

// 			<Form onSubmit={onSubmit}>
// 				<Row className='mb-3'>
// 					{/* PRODUCT NAME*/}
// 					<FormRow
// 						type='text'
// 						name='name'
// 						col='12'
// 						label='Name'
// 						handleChangeInput={handleChangeInput}
// 					/>
// 					<FormRow
// 						type='text'
// 						name='description'
// 						handleChangeInput={handleChangeInput}
// 						col='12'
// 						label='Description'
// 					/>
// 					<FormRow
// 						type='text'
// 						name='price'
// 						handleChangeInput={handleChangeInput}
// 						col='6'
// 						label='Price'
// 					/>
// 				</Row>

// 				<br />
// 				<button
// 					type='submit'
// 					className='btn btn-block clear-btn'
// 					onClick={() => dispatch(clearValues())}
// 				>
// 					Clear
// 				</button>
// 				<Button type='submit' className='btn btn-block submit-btn'>
// 					Submit
// 				</Button>
// 			</Form>
// 		</div>
// 	);
// };

// export default AddProductPage;

// // <FormRow
// // 						number='6'
// // 						type='text'
// // 						label='Product Name'
// // 						name='name'
// // 						controlId='validationName'
// // 						validationText='Name is required'
// // 						errors={errors}
// // 						value={name}
// // 						control={control}
// // 						handleChange={handleChange}
// // 						rules={{ required: true }}
// // 						// rules={{ required: true, maxLength: 20 }}
// // 					/>
// // 					{/* PRODUCT DESCRIPTION*/}
// // 					<FormRow
// // 						number='6'
// // 						type='text'
// // 						label='Description'
// // 						name='description'
// // 						controlId='validationDescription'
// // 						validationText='Description is required'
// // 						errors={errors}
// // 						value={description}
// // 						control={control}
// // 						handleChange={handleChange}
// // 						rules={{ required: true }}
// // 						// rules={{ required: true, maxLength: 20 }}
// // 					/>
// // 					{/* PRODUCT PRICE*/}
// // 					<FormRow
// // 						number='6'
// // 						type='number'
// // 						label='Price'
// // 						name='price'
// // 						controlId='validationPrice'
// // 						validationText='Price must >= 5 '
// // 						errors={errors}
// // 						value={price}
// // 						control={control}
// // 						handleChange={handleChange}
// // 						rules={{
// // 							required: true,
// // 							pattern: {
// // 								value: /^[0-9]+(\.[0-9]{1,2})?$/, // Allow only numbers with optional decimal or float up to 2 decimal places
// // 								message: 'Invalid price format',
// // 							},
// // 							validate: (value) => parseFloat(value) >= 5, // Custom validation function to check if value is greater than 5
// // 						}}
// // 						// rules={{ required: true, maxLength: 20 }}
// // 					/>
