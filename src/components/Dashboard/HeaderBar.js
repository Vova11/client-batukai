import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/user/userSlice';
function HeaderBar({ user }) {
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<Wrapper>
			<Navbar>
				<Container>
					<Navbar.Brand href='/'>ShoeBox</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						<Dropdown>
							<Dropdown.Toggle variant='primary' id='user-dropdown'>
								<FaUserCircle /> {user?.name} - {user?.role}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item href='#action/3.1'>Action</Dropdown.Item>
								<Dropdown.Item href='#action/3.2'>Another action</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Wrapper>
	);
}

export default HeaderBar;

const Wrapper = styled.section`
	.navbar {
		background: var(--clr-primary-5);
	}
	.navbar a {
		color: white;
	}
	.navbar-text {
		color: var(--clr-primary-2);
	}
	span {
		padding-left: 10px;
	}
	.dropdown-menu a {
		color: black;
	}
	.btn {
		border-color: var(--clr-primary-7);
	}
	.btn.show {
		background-color: var(--clr-primary-7);
		border-color: var(--clr-primary-7);
	}
	.btn:hoover {
		border-color: 1px solid red;
	}
`;
