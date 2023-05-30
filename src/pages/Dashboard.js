import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/user/userSlice';

const Dashboard = ({ user }) => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<div>
			<p>id: {user.id}</p>
			<p>email: {user.name}</p>
			<p>role: {user.role}</p>
			<button type='button' onClick={handleLogout}>
				Logout
			</button>
			<Link to='/'>Home</Link>
		</div>
	);
};

export default Dashboard;
