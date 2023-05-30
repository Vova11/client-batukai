import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, user } = useSelector((store) => store.user);

	const [value, setValue] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setValue((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(value));
	};

	useEffect(() => {
		if (user) {
			navigate('/dashboard');
		}
	}, [user, navigate]);

	return (
		<div>
			<h1>Login form</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Email:
					<input
						type='email'
						name='email'
						value={value.email}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type='password'
						name='password'
						value={value.password}
						onChange={handleChange}
					/>
				</label>
				<br />
				<button type='submit'>Submit</button>
			</form>
			<Link to='/'>Home</Link>
		</div>
	);
};

export default Login;
