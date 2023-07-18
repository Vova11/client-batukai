import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, getUser, updateUser } from '../features/user/userSlice';

import Spinner from '../components/Dashboard/Spinner';
const ProtectedRoute = ({ children }) => {
	const { user, isLoading, userObject } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (!user && !isLoading) {
			dispatch(fetchUser());
		}
		if (Object.keys(userObject).length === 0 && user) {
			dispatch(getUser(user.id));
		}
	}, [user, isLoading, userObject, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	if (!user) {
		navigate('/login');
		return null; // Return null to prevent rendering the protected component when user is not logged in
	}

	return children;
};

export default ProtectedRoute;

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ children }) => {
// 	const { user, isLoading } = useSelector((store) => store.user);
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		if (!isLoading && !user) {
// 			navigate('/login');
// 		}
// 	}, [isLoading, user, navigate]);

// 	if (isLoading) {
// 		// Optional: Show a loading indicator while the user authentication is being checked
// 		return <div>Loading...</div>;
// 	}

// 	return children;
// };

// export default ProtectedRoute;
