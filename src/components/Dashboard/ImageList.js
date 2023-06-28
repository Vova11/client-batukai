import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

const ImageList = ({ images, removeImage }) => {
	if (images) {
		const imageItems = images.map((element, index) => (
			<span key={index}>
				<li>{element.publicId}</li>
				<button type='button' onClick={() => removeImage(element.publicId)}>
					Remove image
				</button>
			</span>
		));
		return <ul>{imageItems}</ul>;
	} else {
		return <p>No images available.</p>;
	}
};

export default ImageList;

// {
// 	[...images].map(([publicId, url]) => (
// 		<Col key={publicId} xs={6} md={4}>
// 			<Image src={url} rounded fluid />

// 			<button type='button' onClick={() => removeImage(publicId)}>
// 				Remove image
// 			</button>
// 		</Col>
// 	));
// }
