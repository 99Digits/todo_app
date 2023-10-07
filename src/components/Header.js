import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'


function Header() {
  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/dashboard">Home <i class="fa-solid fa-house"></i> </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Login <i class="fa-solid fa-key fa-beat-fade"></i></Nav.Link>
            <Nav.Link href="register">Register <i class="fa-solid fa-user-plus"></i></Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    
    </>
  )
}

export default Header