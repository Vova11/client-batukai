import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
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
		<Wrapper className='container'>
			<div className='show-window'></div>
			<h2>Account Confirmed</h2>
			<Link to='/login' className='btn'>
				Please login
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.container {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: red;
	}
	.show-window {
		width: 400px;
	}
	body {
		height: 100%;
		background: #76b852; /* fallback for old browsers */
		background: -webkit-linear-gradient(right, #76b852, #8dc26f);
		background: -moz-linear-gradient(right, #76b852, #8dc26f);
		background: -o-linear-gradient(right, #76b852, #8dc26f);
		background: linear-gradient(to left, #76b852, #8dc26f);
		font-family: 'Roboto', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
`;

export default VerifyPage;
