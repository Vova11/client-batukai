import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormRow from '../../pages/FormRow';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../features/user/userSlice';
import { useForm } from 'react-hook-form';

const Profile = () => {
	const { isLoading, user, userObject } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		email: '',
	});

	useEffect(() => {
		if (user) {
			dispatch(getUser(user.id))
				.then((data) => {
					const { firstName, lastName, email } = data.payload.user;
					setUserData({
						firstName: firstName || '',
						lastName: lastName || '',
						email: email || '',
					});
				})
				.catch((error) => {
					console.error('Error fetching user data:', error);
				});
		}
	}, [dispatch, user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUser(userData));
	};

	if (!user) {
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
					onChange={handleChange}
				/>
				<FormRow
					col='6'
					type='text'
					id='lastName'
					name='lasttName'
					label='Last Name'
					value={userData.lastName}
					onChange={handleChange}
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
					onChange={handleChange}
				/>
			</Row>
			<br />
			<button type='submit'>Submit</button>
		</Form>
	);
};

export default Profile;

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import FormRow from '../../pages/FormRow';
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUser, updateUser } from '../../features/user/userSlice';
// import { useForm } from 'react-hook-form';

// const Profile = () => {
// 	const { isLoading, user, userObject } = useSelector((store) => store.user);
// 	const dispatch = useDispatch();

// 	const {
// 		control,
// 		handleSubmit,
// 		setValue,
// 		formState: { errors },
// 	} = useForm();

// 	const [userData, setUserData] = useState({
// 		firstName: '',
// 		lastName: '',
// 		email: '',
// 	});

// 	useEffect(() => {
// 		if (user) {
// 			dispatch(getUser(user.id))
// 				.then((data) => {
// 					const { firstName, lastName, email } = data.payload.user;
// 					setUserData({
// 						firstName: firstName || '',
// 						lastName: lastName || '',
// 						email: email || '',
// 					});
// 					setValue('firstName', firstName); // Update form data using setValue
// 					setValue('lastName', lastName);
// 					setValue('email', email);
// 				})
// 				.catch((error) => {
// 					console.error('Error fetching user data:', error);
// 				});
// 		}
// 	}, [dispatch, user, setValue]);

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setUserData({ ...userData, [name]: value });
// 		setValue(name, value);
// 	};

// 	const submitForm = (data) => {
// 		console.log('Form submitted:', data);
// 		dispatch(updateUser(data));
// 	};

// 	if (!user) {
// 		return <h2>Loading...</h2>;
// 	}

// 	return (
// 		<Form noValidate onSubmit={handleSubmit(submitForm)}>
// 			<Row className='mb-3'>
// 				<FormRow
// 					number='6'
// 					type='text'
// 					label='First Name'
// 					name='firstName'
// 					controlId='validationfirstName'
// 					validationText='First Name is required'
// 					errors={errors}
// 					value={userData.firstName}
// 					control={control}
// 					handleChange={handleChange}
// 					rules={{ required: true }}
// 					// rules={{ required: true, maxLength: 20 }}
// 				/>
// 				<FormRow
// 					number='6'
// 					type='text'
// 					label='Last Name'
// 					name='lastName'
// 					controlId='validationLastName'
// 					validationText='Last Name is required'
// 					errors={errors}
// 					value={userData.lastName}
// 					control={control}
// 					rules={{ required: true }}
// 					handleChange={handleChange}
// 				/>
// 			</Row>
// 			<Row>
// 				<FormRow
// 					number='12'
// 					type='email'
// 					label='E-mail'
// 					name='email'
// 					controlId='validationEmail'
// 					validationText='Email is required'
// 					errors={errors}
// 					value={userData.email}
// 					control={control}
// 					handleChange={handleChange}
// 					rules={{ required: true }}
// 				/>
// 			</Row>
// 			<br />
// 			<Button type='submit'>Submit form</Button>
// 		</Form>
// 	);
// };

// export default Profile;
