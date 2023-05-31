import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/user/userSlice';

const Dashboard = () => {
	const { isLoading, user } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/');
	};

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	return (
		<div>
			<p>id: {user.id}</p>
			<p>name: {user.name}</p>
			<button type='button' onClick={handleLogout}>
				Logout
			</button>
			<Link to='/'>Home</Link>
		</div>
	);
};

export default Dashboard;
