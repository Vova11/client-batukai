import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

const ImageList = ({ images, removeImage }) => {
	return (
		<>
			<p>Access your file at:</p>
			<Row>
				{[...images].map(([publicId, url]) => (
					<Col key={publicId} xs={6} md={4}>
						<Image src={url} rounded fluid />

						<button type='button' onClick={() => removeImage(publicId)}>
							Remove image
						</button>
					</Col>
				))}
			</Row>
		</>
	);
};

export default ImageList;
