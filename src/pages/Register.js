import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import FormRow from './FormRow';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';

const Register = () => {
	const { isLoading } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialState = {
		firstName: '',
		email: '',
		password: '',
	};

	const [values, setValues] = useState(initialState);

	const handleChangeInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setValues({ ...values, [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { firstName, email, password } = values;
		if (!firstName || !email || !password) {
			toast.error('Please fill in all fields');
			return;
		}
		dispatch(registerUser({ firstName, email, password }));
	};

	return (
		<Wrapper className='register-page'>
			<form
				className={isLoading ? 'form form-loading' : 'form'}
				onSubmit={onSubmit}
			>
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				<FormRow
					type='text'
					name='firstName'
					col='12'
					label='First Name'
					value={values.firstName}
					onChange={handleChangeInput}
				/>

				<FormRow
					type='email'
					name='email'
					value={values.email}
					col='12'
					label='E-mail'
					onChange={handleChangeInput}
				/>

				<FormRow
					type='password'
					name='password'
					value={values.password}
					col='12'
					label='Password'
					onChange={handleChangeInput}
				/>
				{/* end of single form row */}
				<button type='submit' className='btn btn-block' disabled={isLoading}>
					{isLoading ? 'Loading...' : 'Register'}
				</button>
				<p>
					Already a have an account?
					<Link to='/login' className='login-link'>
						Log In
					</Link>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;

const Wrapper = styled.section`
	.register-page {
		width: 460px;
		padding: 8% 0 0;
		margin: auto;
		padding-bottom: 50px;
	}
	.form {
		top: 100px;
		position: relative;
		z-index: 1;
		background: #ffffff;
		max-width: 460px;
		margin: 0 auto 100px;
		padding: 45px;
		text-align: center;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
	}
	.form input {
		font-family: 'Roboto', sans-serif;
		outline: 0;
		background: #f2f2f2;
		width: 100%;
		border: 0;
		margin: 0 0 15px;
		padding: 15px;
		box-sizing: border-box;
		font-size: 14px;
	}
	.form button {
		text-transform: uppercase;
		outline: 0;
		background: var(--clr-primary-5);
		width: 100%;
		border: 0;
		padding: 15px;
		color: #ffffff;
		font-size: 14px;
		-webkit-transition: all 0.3 ease;
		transition: all 0.3 ease;
		cursor: pointer;
	}
	.form button:hover,
	.form button:active,
	.form button:focus {
		color: var(--clr-primary-1);
		background: var(--clr-primary-7);
	}
	.form .message {
		margin: 15px 0 0;
		color: #b3b3b3;
		font-size: 12px;
	}
	.form .message a {
		color: #4caf50;
		text-decoration: none;
	}
	.form .register-form {
		display: none;
	}
	.container {
		position: relative;
		z-index: 1;
		max-width: 300px;
		margin: 0 auto;
	}
	.container:before,
	.container:after {
		content: '';
		display: block;
		clear: both;
	}
	.container .info {
		margin: 50px auto;
		text-align: center;
	}
	.container .info h1 {
		margin: 0 0 15px;
		padding: 0;
		font-size: 36px;
		font-weight: 300;
		color: #1a1a1a;
	}
	.container .info span {
		color: #4d4d4d;
		font-size: 12px;
	}
	.container .info span a {
		color: #000000;
		text-decoration: none;
	}
	.container .info span .fa {
		color: #ef3b3a;
	}
	body {
		background: #76b852; /* fallback for old browsers */
		background: -webkit-linear-gradient(right, #76b852, #8dc26f);
		background: -moz-linear-gradient(right, #76b852, #8dc26f);
		background: -o-linear-gradient(right, #76b852, #8dc26f);
		background: linear-gradient(to left, #76b852, #8dc26f);
		font-family: 'Roboto', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
`;

// import { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import FormRow from './FormRow';
// import axios from 'axios';
// import useLocalState from '../utils/localState';
// import Wrapper from '../assets/wrappers/RegisterPage.js';

// function Register() {
// 	const [values, setValues] = useState({
// 		firstName: '',
// 		email: '',
// 		password: '',
// 	});

// 	const {
// 		alert,
// 		showAlert,
// 		loading,
// 		setLoading,
// 		success,
// 		setSuccess,
// 		hideAlert,
// 	} = useLocalState();

// 	const handleChange = (e) => {
// 		setValues({ ...values, [e.target.name]: e.target.value });
// 	};
// 	const onSubmit = async (e) => {
// 		e.preventDefault();
// 		hideAlert();
// 		setLoading(true);
// 		const { name, email, password } = values;
// 		const registerNewUser = { name, email, password };

// 		const url = 'localhost:3002/api/v1';
// 		try {
// 			const { data } = await axios.post(
// 				`${url}/auth/register`,
// 				registerNewUser
// 			);

// 			setSuccess(true);
// 			setValues({ firstName: '', email: '', password: '' });
// 			showAlert({ text: data.msg, type: 'success' });
// 		} catch (error) {
// 			const { msg } = error.response.data;
// 			showAlert({ text: msg || 'there was an error' });
// 		}
// 		setLoading(false);
// 	};

// 	return (
// 		<>
// 			<Wrapper className='page'>
// 				{alert.show && (
// 					<div className={`alert alert-${alert.type}`}>{alert.text}</div>
// 				)}
// 				{!success && (
// 					<form
// 						className={loading ? 'form form-loading' : 'form'}
// 						onSubmit={onSubmit}
// 					>
// 						{/* single form row */}

// 						<FormRow
// 							type='name'
// 							name='firstName'
// 							value={values.firstName}
// 							handleChange={handleChange}
// 						/>

// 						{/* single form row */}
// 						<FormRow
// 							type='email'
// 							name='email'
// 							value={values.email}
// 							handleChange={handleChange}
// 						/>
// 						{/* end of single form row */}
// 						{/* single form row */}
// 						<FormRow
// 							type='password'
// 							name='password'
// 							value={values.password}
// 							handleChange={handleChange}
// 						/>
// 						{/* end of single form row */}
// 						<button type='submit' className='btn btn-block' disabled={loading}>
// 							{loading ? 'Loading...' : 'Register'}
// 						</button>
// 						<p>
// 							Already a have an account?
// 							<Link to='/login' className='login-link'>
// 								Log In
// 							</Link>
// 						</p>
// 					</form>
// 				)}
// 			</Wrapper>
// 		</>
// 	);
// }

// export default Register;
