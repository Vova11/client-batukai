import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderBar } from './';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SideBar } from './';
const SharedLayout = () => {
	return (
		<Wrapper>
			<main className='bg-color'>
				<HeaderBar />
				<Container>
					{/* Stack the columns on mobile by making one full-width and the other half-width */}
					<Row>
						<Col xs={0} md={3} className='d-none d-md-block'>
							<SideBar />
						</Col>

						<Col xs={12} md={9}>
							<div className='page-dashboard'>
								<Outlet />
							</div>
						</Col>
					</Row>
				</Container>
			</main>
		</Wrapper>
	);
};

export default SharedLayout;

const Wrapper = styled.section`
	.bg-color {
		background-color: var(--clr-grey-10);
	}
	.page-dashboard {
		padding-top: 40px;
	}
`;
