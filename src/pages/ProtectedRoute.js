import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
	const { user, isLoading } = useSelector((store) => store.user);
	const navigate = useNavigate();

	if (isLoading && !user) {
		return <h2>Loading...</h2>;
	}
	if (!user) {
		navigate('/login');
		// return <Navigate to='/login' />;
	}
	return children;
};

export default ProtectedRoute;
