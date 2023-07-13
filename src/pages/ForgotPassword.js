import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/PasswordWrapper';
import Form from 'react-bootstrap/Form';
import FormRow from './FormRow';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword, clearSuccessState } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Dashboard/Spinner';

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoading, success } = useSelector((store) => store.user);
	const [email, setEmail] = useState('');

	const handleChangeInput = (e) => {
		setEmail(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (!email) {
			return toast.error('Please fill in all values');
		}
		dispatch(forgotPassword(email));
	};

	useEffect(() => {
		if (success !== '') {
			const timeoutId = setTimeout(() => {
				navigate('/login');
				dispatch(clearSuccessState());
			}, 2500);

			return () => clearTimeout(timeoutId);
		}
	}, [success, navigate, dispatch]);

	if (success !== '') {
		return (
			<Wrapper className='login-page'>
				<div className='success-box'>
					<h4>{success}</h4>
					<p>you will be redirect to login page</p>
				</div>
				<div className='spinner'>{<Spinner />}</div>
			</Wrapper>
		);
	}

	return (
		<Wrapper className='login-page'>
			{!success && (
				<Form
					className={isLoading ? 'form form-loading' : 'form'}
					onSubmit={onSubmit}
				>
					<h3>Reset password</h3>
					<FormRow
						type='email'
						name='email'
						value={email}
						col='12'
						label='Email'
						onChange={handleChangeInput}
					/>
					{/* end of single form row */}
					<button type='submit' className='btn btn-block' disabled={isLoading}>
						{isLoading ? 'Loading...' : 'Get reset password link'}
					</button>
					<p>
						Already have an account?{' '}
						<Link to='/login' className='reset-link'>
							Login
						</Link>
					</p>
				</Form>
			)}
		</Wrapper>
	);
};

export default ForgotPassword;
