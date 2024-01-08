import React, { Fragment } from 'react'
import { Container, Row, Col, Image, Modal, Button } from 'react-bootstrap'
import { CartHero } from './'
import delivery from '../assets/images/delivery.svg'

const WidgetStart = ({ openWidget }) => {
  return (
    <Container className='section'>
      <Row>
        <Col
          md='12'
          className='d-flex align-items-center justify-content-center mb-5'
        >
          <Button onClick={openWidget}>Vybrať miesto doručenia</Button>
        </Col>
      </Row>
      <Row>
        <Col
          md='12'
          className='d-flex align-items-center justify-content-center'
        >
          <Image src={delivery} className='img-fluid'></Image>
        </Col>
      </Row>
    </Container>
  )
}

export default WidgetStart
