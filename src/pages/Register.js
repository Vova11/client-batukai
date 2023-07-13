import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormRow from './FormRow';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Dashboard/Spinner';
import Wrapper from '../assets/wrappers/PasswordWrapper';
import { registerUser, clearSuccessState } from '../features/user/userSlice';

const Register = () => {
	const { isLoading, success } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialState = {
		firstName: '',
		email: '',
		password: '',
	};

	const [values, setValues] = useState(initialState);

	if (success !== '') {
		return (
			<Wrapper className='login-page'>
				<div className='success-box'>
					<h4>{success}</h4>
				</div>
			</Wrapper>
		);
	}

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
		<Wrapper className='login-page'>
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
