import React from 'react';
import FormRow from '../../pages/FormRow';
const MultipleImagesUpload = ({ onChange }) => {
	return (
		<FormRow
			controlId='formFileMultiple'
			className='mb-3'
			type='file'
			name='images'
			label='Upload images'
			onChange={onChange}
			multiple
		/>
	);
};

export default MultipleImagesUpload;
