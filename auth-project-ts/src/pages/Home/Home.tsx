import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutRequest } from '../Auth/redux/actions'
import { Row, Col, Card } from 'react-bootstrap'
const Home = () => {
  const dispatch = useDispatch()
  return (
    <>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#home">Home Page</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link onClick={() => dispatch(logoutRequest())} to={'/login'}>
                SignOut
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="mt-5 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h4>Welcome to Splash Screen</h4>
                  <p>
                    Please Signout and redirect the same URL to verify the Route
                    Authentication
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
