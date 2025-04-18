import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FormRow from './FormRow';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword, clearSuccessState } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Dashboard/Spinner';
import Wrapper from '../assets/wrappers/PasswordWrapper';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
	const { isLoading, success } = useSelector((store) => store.user);

	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const query = useQuery();

	const handleChangeInput = async (e) => {
		setPassword(e.target.value);
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

	const onSubmit = async (e) => {
		e.preventDefault();

		if (!password) {
			toast.error({ text: 'please enter password' });
			return;
		}
		dispatch(
			resetPassword({
				password,
				token: query.get('token'),
				email: query.get('email'),
			})
		);
	};

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
					<h4>Reset password</h4>
					{/* single form row */}
					<FormRow
						type='password'
						name='password'
						value={password}
						col='12'
						label='Password'
						onChange={handleChangeInput}
					/>

					{/* end of single form row */}
					<button type='submit' className='btn btn-block' disabled={isLoading}>
						{isLoading ? 'Please Wait...' : 'New Password'}
					</button>
				</Form>
			)}
		</Wrapper>
	);
};

export default ResetPassword;
