import React from 'react';
import FormRow from '../../pages/FormRow';

const MainImageUpload = ({ onChange }) => {
	return (
		<FormRow
			controlId='formFile'
			className='mb-3'
			type='file'
			name='image'
			label='Upload Main image'
			onChange={onChange}
		/>
	);
};

export default MainImageUpload;
