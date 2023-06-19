import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import FormRow from './FormRow';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
	const [password, setPassword] = useState('');

	const query = useQuery();

	const handleChange = async (e) => {
		setPassword(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// setLoading(true);
		if (!password) {
			// showAlert({ text: 'please enter password' });
			// setLoading(false);
			return;
		}
		try {
			const { data } = await axios.post('/api/v1/auth/reset-password', {
				password,
				token: query.get('token'),
				email: query.get('email'),
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Wrapper className='page'>
			<h2>Reset password</h2>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	h4,
	p {
		text-align: center;
	}
	p {
		margin: 0;
		margin-top: 1rem;
	}
`;

export default ResetPassword;
