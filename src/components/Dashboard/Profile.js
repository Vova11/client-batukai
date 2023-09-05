import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormRow from '../../pages/FormRow';
import { getUser, updateUser } from '../../features/user/userSlice';
const Profile = () => {
	const { user, userObject } = useSelector((store) => store.user);

	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		firstName: userObject?.firstName || '',
		lastName: userObject?.lastName || '',
		email: userObject?.email || '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(updateUser(userData));
		const updatedUser = await dispatch(getUser(user.id));
		setUserData({
			firstName: updatedUser.firstName || '',
			lastName: updatedUser.lastName || '',
			email: updatedUser.email || '',
		});
	};

	if (!user && !userObject) {
		return <h2>Loading...</h2>;
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Row className='mb-3'>
				<FormRow
					col='6'
					type='text'
					id='firstName'
					name='firstName'
					label='First Name'
					value={userData.firstName}
					onChange={handleInputChange}
				/>
				<FormRow
					col='6'
					type='text'
					id='lastName'
					name='lastName'
					label='Last Name'
					value={userData.lastName}
					onChange={handleInputChange}
				/>
			</Row>
			<Row>
				<FormRow
					col='6'
					type='text'
					id='email'
					name='email'
					label='E-mail'
					value={userData.email}
					onChange={handleInputChange}
					disabled={true}
				/>
			</Row>
			<br />
			<button type='submit'>Submit</button>
		</Form>
	);
};

export default Profile;
