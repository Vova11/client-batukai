import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderBar } from './';
import styled from 'styled-components';

const CartContainer = () => {
	return (
		<Wrapper>
			<main className='bg-color'>
				{/* Stack the columns on mobile by making one full-width and the other half-width */}

				<div className='page-dashboard'>
					<Outlet />
				</div>
			</main>
		</Wrapper>
	);
};

export default CartContainer;

const Wrapper = styled.section``;
