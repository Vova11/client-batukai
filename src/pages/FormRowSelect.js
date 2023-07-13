import React from 'react';
import { Form, Col } from 'react-bootstrap';

const FormRowSelect = ({
	type,
	col,
	label,
	id,
	name,
	value,
	onChange,
	labelText,
	controlId,
	options,
}) => {
	return (
		<Form.Group as={Col} md={col} controlId={controlId}>
			<Form.Label>{label}</Form.Label>
			<Form.Select name={name} id={id} value={value} onChange={onChange}>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</Form.Select>
		</Form.Group>
	);
};

export default FormRowSelect;
