import React from 'react';
import {Col, Row, Button, Card} from 'react-bootstrap';

const ImageList = ({ images, productId, source, removeImage }) => {
	if (images) {
		const imageItems = images.map((element, index) => (
			<Col xs={12} md={4} key={index} className='mt-2'>
				<Card>
					<Card.Img variant='top' src={element.url} />
					<Card.Body>
						<Button
							variant='primary'
							onClick={() => removeImage(element.publicId, productId, source)}
						>
							Remove image
						</Button>
					</Card.Body>
				</Card>
			</Col>
		));
		return <Row>{imageItems}</Row>;
	} else {
		return <p>No images available.</p>;
	}
};

export default ImageList;

// <Image src={element.url} rounded fluid />
// 				<button
// 					type='button'
// 					className='btn'
// 					onClick={() => removeImage(element.publicId, productId, source)}
// 				>
// 					Remove image
// 				</button>

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
