import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Link, useNavigate } from 'react-router-dom';
import FormRow from './FormRow';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';

const Register = () => {
	const { user, isLoading } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const initialState = {
		firstName: '',
		email: '',
		password: '',
		isMember: false,
	};

	const navigate = useNavigate();

	const [values, setValues] = useState(initialState);

	const handleChange = (e) => {
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
		// dispatch(registerUser({ firstName, email, password }));
	};

	return (
		<Wrapper className='full-page'>
			<form
				className={isLoading ? 'form form-loading' : 'form'}
				onSubmit={onSubmit}
			>
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				<FormRow
					type='text'
					name='firstName'
					value={values.firstName}
					handleChange={handleChange}
				/>

				<FormRow
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
				/>

				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
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
