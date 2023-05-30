import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user, isLoading }) => {
	if (!user) {
		return <Navigate to='/login' />;
	}
	return children;
};

export default ProtectedRoute;
