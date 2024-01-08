import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import { PageHero } from './'
import { toast } from 'react-toastify'
import customFetch from '../utils/axios'
import Spinner from '../components/Dashboard/Spinner'
import super_thank_you from '../assets/images/super_thank_you.svg'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)

      // Email validation - checking if the email contains '@' symbol
      const email = formData.email
      if (!email || !email.includes('@')) {
        toast.error('Please enter a valid email address.')
        setIsLoading(false)
        return // Prevent form submission if email is invalid
      }

      const response = await customFetch.post(
        '/contact/contact-email',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        })
        toast.success('Email was sent')
        setIsEmailSent(true)
      }
    } catch (error) {
      console.log(error)
      toast.error('Email was not sent')
    } finally {
      setIsLoading(false) // Set isLoading to false regardless of success or failure
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <main>
      {/* Assuming PageHero and Wrapper components are properly implemented */}
      {/* <PageHero title='Contact' /> */}
      <div>
        <PageHero title='Contact' />
        <Wrapper className='page-100'>
          {isEmailSent ? (
            <div
              className='container contact-form text-center'
              style={{ paddingTop: '40px' }}
            >
              <h2>Thank You!</h2>
              <p>Your message has been successfully sent.</p>
              <img
                src={super_thank_you}
                alt='thank you'
                style={{ height: '450px', width: 'auto' }}
              />
            </div>
          ) : (
            <div className='container contact-form'>
              <form onSubmit={handleSubmit}>
                <h3>Drop Us a Message</h3>
                <Row>
                  <Col md='6'>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='name'
                        className='form-control'
                        placeholder='Your Name *'
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='email'
                        className='form-control'
                        placeholder='Your Email *'
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='phone'
                        className='form-control'
                        placeholder='Your Phone Number *'
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='submit'
                        name='btnSubmit'
                        className='btn'
                        value='Send Message'
                      />
                    </div>
                  </Col>

                  <Col md='6'>
                    <div className='form-group'>
                      <textarea
                        name='message'
                        className='form-control'
                        placeholder='Your Message *'
                        style={{ width: '100%', height: '150px' }}
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          )}
        </Wrapper>
      </div>
    </main>
  )
}

export default ContactForm

const Wrapper = styled.section`
  .contact-form {
    background: #fff;
  }
  .contact-form .form-control {
    border-radius: 1rem;
  }
  .contact-image {
    text-align: center;
  }
  .contact-image img {
    border-radius: 6rem;
    width: 11%;
    margin-top: -3%;
    transform: rotate(29deg);
  }
  .contact-form form {
    padding: 5%;
  }
  .contact-form form .row {
    margin-bottom: -7%;
  }
  .contact-form h3 {
    margin-bottom: 8%;
    text-align: center;
    color: var(--clr-primary-3);
  }
  .contact-form .btnContact {
    width: 50%;
    border: none;
    border-radius: 1rem;
    padding: 1.5%;
    background: #dc3545;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }
  .btnContactSubmit {
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    color: #fff;
    background-color: #0062cc;
    border: none;
    cursor: pointer;
  }
  .form-group {
    margin-bottom: 20px;
  }
`
