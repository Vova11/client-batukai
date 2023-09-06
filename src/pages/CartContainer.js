import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderBar } from './';
import styled from 'styled-components';

const CartContainer = () => {
	return (
		<div>
			{/* Stack the columns on mobile by making one full-width and the other half-width */}
			<Outlet />
		</div>
	);
};

export default CartContainer;

const Wrapper = styled.section``;
