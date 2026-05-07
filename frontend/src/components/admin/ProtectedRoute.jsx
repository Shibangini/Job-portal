import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { user } = useSelector((store) => store.auth || {});

	// If user is not logged in or not a recruiter, redirect to home
	if (!user || user?.role !== 'recruiter') {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;