import React from 'react';

const MainImage = ({ images, removeImage }) => {
	console.log('jjj');

	return (
		<ul>
			{[...images].map(([publicId, url]) => (
				<li>
					<a href={url} target='_blank' rel='noopener noreferrer'>
						{url}
					</a>
					<button type='button' onClick={() => removeImage(publicId)}>
						Remove image
					</button>
				</li>
			))}
		</ul>
	);
};
export default MainImage;
