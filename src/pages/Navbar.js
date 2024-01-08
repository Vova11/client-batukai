import { Nav, Navbar, Offcanvas, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import { Logo } from './'
import { CartButtons } from './'
import styled from 'styled-components'
function OffcanvasExample() {
  const expand = 'md'
  return (
    <Wrapper>
      <Navbar key={expand} expand={expand} className='bg-body-tertiary'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Sweetvape.eu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='ms-auto'>
                {links.map((link) => {
                  const { id, text, url } = link
                  return (
                    <Link to={url} key={id} className='nav-link'>
                      {text}
                    </Link>
                  )
                })}
              </Nav>
              <Nav className='ms-auto'>
                {/* Right-align cart buttons */}
                <CartButtons />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Wrapper>
  )
}

const Wrapper = styled.nav``

export default OffcanvasExample
