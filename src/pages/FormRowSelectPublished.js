import React from 'react';
import { Form, Col } from 'react-bootstrap';

const FormRowSelectPublished = ({
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
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Form.Select>
		</Form.Group>
	);
};

export default FormRowSelectPublished;
