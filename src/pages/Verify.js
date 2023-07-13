import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/PasswordWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../features/user/userSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
	const dispatch = useDispatch();
	const { isLoading, error } = useSelector((store) => store.user);

	const query = useQuery();

	const verifyToken = async () => {
		dispatch(
			verifyEmail({
				verificationToken: query.get('token'),
				email: query.get('email'),
			})
		);
	};

	useEffect(() => {
		if (!isLoading) {
			verifyToken();
		}
	}, []);

	if (error) {
		return (
			<Wrapper className='login-page'>
				<h4>There was an error, please double check your verification link </h4>
			</Wrapper>
		);
	}

	if (isLoading) {
		return (
			<Wrapper className='login-page'>
				<h2>Loading...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper className='login-page'>
			<div className='success-box-after-registration'>
				<h2>Account Confirmed</h2>
				<Link to='/login' className='btn'>
					Please login
				</Link>
			</div>
		</Wrapper>
	);
};

export default VerifyPage;
