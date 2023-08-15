import React, { useState } from 'react';

const OrderForm = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		address: '',
		houseNumber: '',
		city: '',
		zipCode: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData); // You can replace this with sending data to a server
	};

	return (
		<div className='mt-5'>
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<label htmlFor='firstName' className='form-label'>
						First Name
					</label>
					<input
						type='text'
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
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
						onChange={handleChange}
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
						onChange={handleChange}
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
						onChange={handleChange}
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
						onChange={handleChange}
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
						onChange={handleChange}
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
						onChange={handleChange}
						className='form-control'
						required
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default OrderForm;
