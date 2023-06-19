import React from 'react';
import { Form, Col } from 'react-bootstrap';
const FormRow = ({
	type,
	col,
	label,
	id,
	name,
	value,
	onChange,
	labelText,
	controlId,
	multiple,
}) => {
	return (
		<Form.Group as={Col} md={col}>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type={type}
				name={name}
				id={id}
				value={value}
				onChange={onChange}
				multiple={type === 'file' && multiple} // Render 'multiple' attribute only for 'file' type if 'multiple' prop is true
			/>
		</Form.Group>

		// <div className='form-row'>
		// 	<label htmlFor={name} className='form-label'>
		// 		{labelText || name}
		// 	</label>
		// 	<input
		// 		id={name}
		// 		type={type}
		// 		name={name}
		// 		value={value}
		// 		onChange={handleChange}
		// 		className='form-input'
		// 	/>
		// </div>
	);
};
export default FormRow;

// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import { Controller, useForm } from 'react-hook-form';
// const FormRow = ({
// 	number,
// 	type,
// 	label,
// 	name,
// 	controlId,
// 	validationText,
// 	errors,
// 	value,
// 	control,
// 	handleChange,
// 	rules,
// }) => {
// 	return (
// 		<Form.Group as={Col} md={number} controlId={controlId}>
// 			<Form.Label>{label}</Form.Label>
// 			<Controller
// 				name={name}
// 				control={control}
// 				rules={rules}
// 				render={({ field }) => (
// 					<Form.Control
// 						{...field}
// 						type={type}
// 						isInvalid={errors[name]}
// 						value={value || ''}
// 						onChange={handleChange}
// 					/>
// 				)}
// 			/>
// 			{errors[name] && (
// 				<Form.Control.Feedback type='invalid'>
// 					{validationText}
// 				</Form.Control.Feedback>
// 			)}
// 		</Form.Group>
// 	);
// };

// export default FormRow;
