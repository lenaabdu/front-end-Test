import React  from "react";
import Form from 'react-bootstrap/Form';
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Apireg } from "../apireg";
import '../App.css';
import Container from 'react-bootstrap/Container';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const data = new FormData();
class Adduser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User: [],
    
      email: "",
      password: "",
      confirmPassword:"",
      eircode:"",
      fileData:"",
    
    };
    this.apireg = new Apireg();
    toast.configure();
  }

  emailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  confirmPasswordChange= (e) => {
    this.setState({
     confirmPassword: e.target.value,
    });
  };
  
  eircode= (e) => {
    this.setState({
      eircode: e.target.value,
    });
  };

  fileChangeHandler = (e) => {
    this.setState({
      fileData:e.target.files[0],
      fileDIS: URL.createObjectURL(e.target.files[0]),
  });
};

 
  notify = () => {
    toast("Success");
  };

  SubmitHandler(e) {
    e.preventDefault();
   
    if ( this.state.confirmPassword !==  this.state.password) {
      alert("Passwords do not match");
      window.location.reload();
      
		} else {
      this.apireg
      .addUser(
        this.state.email,
        this.state.password,
        this.state.confirmPassword,
        this.state.eircode
      )
      .then(() => {
        toast.success("You registration has been saved.", {
          position: toast.POSITION.TOP_CENTER,
          
 
        });

        
        
      });
      data.append("image", this.state.fileData);
      fetch("https://git.heroku.com/back-end-login.git/single", {
        method: "POST",
        body: data,
      })
        .then((result) => {
          console.log("File Sent Successful");
        })
        .catch((err) => {
          console.log(err.message);
         
        });
    };
		
 
  }

  render() {
    return (
      <Container>
     <h3 className=" home">Register</h3> <br/>
        <Form className="form" onSubmit={(e) => this.SubmitHandler(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail"> 
           <Form.Label>Email Address</Form.Label> 
            <Form.Control
              id="customer-email"
              placeholder="Enter you email "
              type="email"
              name="email"
              value={this.state.email}
              onChange={(e) => this.emailChange(e)}
              required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail"> 
              <Form.Label>Password</Form.Label>    
              <Form.Control
                       placeholder="password"
              id="customer-password"
              type="password" 
              name="psw" 
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
              value={this.state.password}
              onChange={(e) => this.passwordChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail"> 
              <Form.Label>Confirm Password</Form.Label> 
            <Form.Control
               id="customer-confirmPassword"
               placeholder="confirm password"
               type="password" 
               name="psw" 
               pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
               title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              value={this.state.confirmPassword}
              minLength="8"
              onChange={(e) => this.confirmPasswordChange(e)}
            />
              </Form.Group>
             
            <Form.Group className="mb-3" controlId="formBasicEmail"> 
              <Form.Label>Eircode</Form.Label> 
              
           
             
            <Form.Control
              id="customer-eircode"
              type="text"
              placeholder="eircode"
              pattern="(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ -]?[0-9AC-FHKNPRTV-Y]{4}$" 
              title="Please enter a valid eircode"
              value={this.state.eircode}
              onChange={(e) => this.eircode(e)}
            />
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Image </Form.Label> <br />

            
          
          <Col xs={6} md={4}>
          <input   
          
          type="file" 
          accept=".jpg, .jpeg, .png"
          id="image_uploads"
          onChange={(e) =>this.fileChangeHandler(e)} /><br/><br/>
    <Image  className="img"  src={this.state.fileDIS} />
  
    </Col>
    </Form.Group>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Button  variant="dark" type="submit" disabled={this.state.disabled}> Submit </Button>
            <br/>
          <p className="link">   <br/>
				Already have an account? <Link to="/">Sign In</Link>
			</p>
        </Form>
        </Container>
    );
  }
}

export default Adduser;