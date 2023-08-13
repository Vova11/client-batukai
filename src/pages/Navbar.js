import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, NavLink } from 'react-router-dom';
import { links } from '../utils/constants';
import { Fragment } from 'react';
import logo from '../assets/images/logo.svg';
import { CartButtons } from './';
import styled from 'styled-components';
function OffcanvasExample() {
	return (
		<Wrapper>
			{['md'].map((expand) => (
				<Navbar key={expand} expand={expand} className='bg-body-tertiary'>
					<Container fluid>
						<Navbar.Brand as={Link} to='/'>
							<img src={logo} alt='ShoeBox' />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
						<Navbar.Offcanvas
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement='end'
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
									Offcanvas
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className='justify-content-end flex-grow-1 pe-3'>
									{links.map((link) => {
										const { id, text, url } = link;
										return (
											<Link to={url} key={id} className='nav-link'>
												{text}
											</Link>
										);
									})}
								</Nav>
								<Nav className='justify-content-end flex-grow-1 pe-3'>
									<CartButtons />
								</Nav>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</Wrapper>
	);
}

const Wrapper = styled.nav``;

export default OffcanvasExample;
