import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
const OrderForm = () => {
	const navigate = useNavigate();
	const initialState = {
		firstName: '',
		lastName: '',
		email: '',
		address: '',
		houseNumber: '',
		city: '',
		zipCode: '',
		isOver18: false, // Default value
		agreeWithConditions: false,
	};

	const [formData, setFormData] = useState(initialState);

	// Check localStorage on component mount
	useEffect(() => {
		const storedFormData = localStorage.getItem('orderForm');
		if (storedFormData) {
			const parsedFormData = JSON.parse(storedFormData);
			setFormData(parsedFormData);
		}
	}, []);

	// Function to handle form input changes
	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === 'checkbox' ? checked : value;
		setFormData((prevData) => ({
			...prevData,
			[name]: newValue,
		}));
	};

	// Function to handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formData.isOver18);
		if (!formData.isOver18) {
			toast.error('Please confirm that you are above 18 years old');
		}

		if (!formData.agreeWithConditions) {
			toast.error('Please agree to the conditions');
		}

		if (formData.isOver18 && formData.agreeWithConditions) {
			localStorage.setItem('orderForm', JSON.stringify(formData));
			navigate('/cart/review'); // Ensure this is the correct route path
		}
	};

	const handleContinueShopping = () => {
		navigate('/products');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='mb-3'>
				<label htmlFor='firstName' className='form-label'>
					First Name
				</label>
				<input
					type='text'
					name='firstName'
					value={formData.firstName}
					onChange={handleInputChange}
					className='form-control'
					required
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='lastName' className='form-label'>
					Last Name
				</label>
				<input
					type='text'
					name='lastName'
					value={formData.lastName}
					onChange={handleInputChange}
					className='form-control'
					required
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='email' className='form-label'>
					Email
				</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleInputChange}
					className='form-control'
					required
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='address' className='form-label'>
					Address
				</label>
				<input
					type='text'
					name='address'
					value={formData.address}
					onChange={handleInputChange}
					className='form-control'
					required
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='houseNumber' className='form-label'>
					House Number
				</label>
				<input
					type='text'
					name='houseNumber'
					value={formData.houseNumber}
					onChange={handleInputChange}
					className='form-control'
					required
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='city' className='form-label'>
					City
				</label>
				<input
					type='text'
					name='city'
					value={formData.city}
					onChange={handleInputChange}
					className='form-control'
					required
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='zipCode' className='form-label'>
					Zip Code
				</label>
				<input
					type='text'
					name='zipCode'
					value={formData.zipCode}
					onChange={handleInputChange}
					className='form-control'
					required
				/>
			</div>
			<div className='form-check'>
				<input
					type='checkbox'
					className='form-check-input'
					id='isOver18'
					name='isOver18'
					checked={formData.isOver18}
					onChange={handleInputChange}
				/>
				<label className='form-check-label' htmlFor='isOver18'>
					I am more than 18 years old
				</label>
			</div>
			<div className='form-check'>
				<input
					type='checkbox'
					className='form-check-input'
					id='agreeWithConditions'
					name='agreeWithConditions'
					checked={formData.agreeWithConditions}
					onChange={handleInputChange}
				/>
				<label className='form-check-label' htmlFor='agreeWithConditions'>
					Vseobecne obchodne podmienky
				</label>
			</div>

			<Buttons>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
				<button
					type='button'
					className='btn btn-primary'
					onClick={handleContinueShopping}
				>
					Continue shopping
				</button>
			</Buttons>
		</form>
	);
};

export default OrderForm;

const Buttons = styled.section`
	display: flex;
	gap: 10px; /* Adjust spacing as needed */
`;

const SubmitButton = styled.button`
	/* Your button styles here */
`;

const ContinueButton = styled.button`
	/* Your button styles here */
`;
