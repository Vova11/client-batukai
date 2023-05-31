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
	};
	return <Wrapper className='page'>REGISTER</Wrapper>;
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
