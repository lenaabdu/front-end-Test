import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';
import Adduser from './Register';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false
    }
  }
//  function that checks  the email and password 
  submitHandler(e) {
    e.preventDefault()
    this.setState({ disabled: true })
    this.props.client.login(e.target.email.value, e.target.password.value)
      .then((response) => {
        this.setState({ disabled: false })
        this.props.loggedIn(response.data.token)
      })
      .catch(() => {
        alert("please check your email and password and try again");
        this.setState({ disabled: false });
        window.location.reload();
      
      })
    
  }

  render() {
    return (
      <>
  <Router>
  <Navbar   bg="dark" variant="dark" fixed="top"  expand="md">
  <Navbar.Brand>Navbar</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link className="nav-link" to="/register" >Register</Link>
      <Link className="nav-link" to="/" >Login</Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
       <Container>
       <Switch>
       
       <Route path="/register">
          <Adduser/>
      </Route>
      <Container>
      <Route path="/">
      <h3 className=" home">Login</h3> <br/>
  <Form onSubmit={(e) => this.submitHandler(e)} >
  <Form.Group className="mb-3" controlId="formBasicEmail"> 
  <Form.Label>Email</Form.Label> 
          <Form.Control type="email" name="email"  placeholder="Enter you email"disabled={this.state.disabled} /><br />
          </Form.Group>
      <p>Password</p>
          <Form.Control  type="password" name="password"  placeholder=" Enter you Password" disabled={this.state.disabled} /><br /><br />
          <Button variant="dark" type="submit" disabled={this.state.disabled}> Login </Button>
       
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <p className="link "><br/>
				Don't have an account? <Link to="/register">Sign Up</Link>    <br/>
			</p>
  </Form.Group>
  </Form>
      </Route>
      </Container>
      </Switch>
      </Container>
      </Router>



      </>
    )

  }
}

export default Login;
