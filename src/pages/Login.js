import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import FormRow from './FormRow';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, user } = useSelector((store) => store.user);

	const [auth, setAuth] = useState({
		email: '',
		password: '',
	});

	const handleChangeInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setAuth({ ...auth, [name]: value });
	};

	const submitForm = (e) => {
		e.preventDefault();
		if (!auth.email && !auth.password) {
			return toast.error('Please fill in all values');
		}
		dispatch(loginUser(auth));
		navigate('/dashboard');
	};

	// useEffect(() => {
	// 	if (user) {
	// 		navigate('/dashboard');
	// 	}
	// }, [user, navigate]);

	return (
		<>
			<Wrapper className='login-page'>
				{alert.show && (
					<div className={`alert alert-${alert.type}`}>{alert.text}</div>
				)}
				<Form
					className={isLoading ? 'form form-loading' : 'form'}
					noValidate
					onSubmit={submitForm}
				>
					<h3>LOGIN</h3>
					{/* single form row */}
					<FormRow
						type='text'
						name='email'
						col='12'
						label='E-mail'
						onChange={handleChangeInput}
					/>
					{/* end of single form row */}
					{/* single form row */}
					<FormRow
						type='password'
						name='password'
						col='12'
						label='Password'
						onChange={handleChangeInput}
					/>
					{/* end of single form row */}
					<button type='submit' className='btn btn-block' disabled={isLoading}>
						{isLoading ? 'Loading...' : 'Login'}
					</button>

					<br />
					<p>
						Don't have an account?
						<Link to='/register' className='register-link'>
							Register
						</Link>
					</p>
					<p>
						Forgot your password?{' '}
						<Link to='/user/forgot-password' className='reset-link'>
							Forgot Password
						</Link>
					</p>
				</Form>
			</Wrapper>
		</>
	);
};

export default Login;

const Wrapper = styled.section`
	.login-page {
		width: 460px;
		padding: 8% 0 0;
		margin: auto;
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
