import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import FormRow from '../../pages/FormRow';
import Col from 'react-bootstrap/Col';
import ImageList from './ImageList';
import Spinner from './Spinner';
import { convertBase64 } from '../../utils/convertBase64';
import {
	handleChange,
	createProduct,
	editProduct,
	addVariant,
	removeVariant,
	uploadMultipleProductImages,
	uploadSingleProductImage,
	clearValues,
	removeImage,
	addImages,
	removeImageFromImages,
	removeMainImage,
	setUserId,
} from '../../features/product/productSlice.js';
import { toast } from 'react-toastify';

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
						id: editProductId,
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
	const [file, setFile] = useState(null);
	const [base64URL, setBase64URL] = useState('');
	const [files, setFiles] = useState([]);
	const [base64URLs, setBase64URLs] = useState([]);

	const handleSingleFileInputChange = async (e) => {
		const selectedFile = e.target.files[0];
		if (product.image.length > 0) {
			toast.error('Before upload please delete existing main image');
			return;
		}
		try {
			const base64Result = await convertBase64(selectedFile);
			selectedFile['base64'] = base64Result;
			setBase64URL(base64Result);
			setFile(selectedFile);
			dispatch(uploadSingleProductImage(base64Result));
		} catch (err) {
			console.log(err);
		}
	};

	const handleMultipleFileInputChange = async (e) => {
		const selectedFiles = e.target.files;
		const convertedBase64URLs = [];

		for (let i = 0; i < selectedFiles.length; i++) {
			const selectedFile = selectedFiles[i];

			try {
				const base64Result = await convertBase64(selectedFile);
				selectedFile['base64'] = base64Result;
				convertedBase64URLs.push(base64Result);
			} catch (err) {
				console.log(err);
			}
		}
		setBase64URLs(convertedBase64URLs);
		const result = await dispatch(
			uploadMultipleProductImages(convertedBase64URLs)
		);
		dispatch(addImages(result.payload));
		setFiles(Array.from(selectedFiles));
	};

	const removeMainProductImage = (publicId, productId, source) => {
		console.log(publicId, productId, source);
		try {
			dispatch(removeImage({ publicId, productId, source }));
			dispatch(removeMainImage());
		} catch (error) {
			console.error(error);
		}
	};

	const removeProductImage = async (publicId, productId, source) => {
		console.log(publicId, productId, source);
		try {
			await dispatch(removeImage({ publicId, productId, source }));
			await dispatch(removeImageFromImages(publicId));
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
					<div key={index} className='mb-3'>
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
								id={`size-${index}`}
								name='size'
								label='Size'
								value={variant.size}
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
					<Col md={4}>
						<input
							type='file'
							name='file'
							onChange={handleSingleFileInputChange}
						/>
					</Col>
					<Col md={4}>
						<input
							type='file'
							name='file'
							multiple
							onChange={handleMultipleFileInputChange}
						/>
					</Col>
				</Row>
				<br />
				<button type='button' className='btn me-2' onClick={handleAddVariant}>
					Add Variant
				</button>
				<button
					type='button'
					className='btn me-2'
					onClick={() => dispatch(clearValues())}
				>
					Clear Values
				</button>
				<button type='submit' className='btn'>
					{!isEditing ? 'Submit' : 'Edit'}
				</button>
			</Form>
			<div>
				{product.image.length > 0 && (
					<div className='mt-5'>
						<h4>Main image</h4>
						<hr />
					</div>
				)}

				<ImageList
					images={product.image}
					productId={product.editProductId}
					source='product'
					removeImage={removeMainProductImage}
				/>
			</div>
			<div>
				{product.images.length > 0 ? (
					<div className='mt-5'>
						<h4>Images</h4>
						<hr />
					</div>
				) : (
					''
				)}
				<ImageList
					images={product.images}
					productId={product.editProductId}
					source='picture'
					removeImage={removeProductImage}
				/>
			</div>

			<div>{isLoading && <Spinner />}</div>
		</>
	);
};

export default AddProductPage;
