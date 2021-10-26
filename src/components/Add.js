import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import 'react-country-dropdown/dist/index.css'

class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      selectValue:""
    ,
    }
  

  } 
//  function that save  input values and update values 
  submitHandler(e) {
    e.preventDefault()
    this.setState({ disabled: true })
    let result
    if (this.props.currentAd) {
    
      result = this.props.client.updateAd(this.props.currentAd._id, e.target.location.value, e.target.date.value, e.target.min_temp.value, e.target.max_temp.value,e.target.wind_speed.value, e.target.wind_dir.value, e.target.wind_speed_night.value, e.target.wind_dir_night.value )
      document.getElementById('101').textContent = 'Submit';
    } else {
      result = this.props.client.addAd(e.target.location.value, e.target.date.value, e.target.min_temp.value, e.target.max_temp.value,e.target.wind_speed.value, e.target.wind_dir.value, e.target.wind_speed_night.value, e.target.wind_dir_night.value )
   
    }
    console.log(this.props.client.addAd)

    result.then(() => {
      this.setState({ disabled: false })
      document.getElementById("addForm").reset()
      this.props.refreshList()
    })
      .catch(() => {
        console.log("catch")
        alert("an error occured, please try again");
        this.setState({ disabled: false })
      })
  }  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.currentAd?.location });
    
    window.location.reload();
   
  }


  render() {
 

    return (
      <>
<Container>
     <h2 className=" home">  {this.props.currentAd ? "Edit" : "Add New"}</h2> <br />
     
        <Form onSubmit={(e) => this.submitHandler(e)} id="addForm" >
        <Form.Group className="mb-3" controlId="formBasicEmail"> 
        <Form.Label> Location</Form.Label> 

         
          <Form.Control     id="countryFlag" placeholder="Location" type="text" defaultValue={this.props.currentAd?.location} name="location" disabled={this.state.disabled} /><br />
          <Form.Group className="mb-3" controlId="formBasicEmail"> 
          </Form.Group>
          <Form.Label> Date</Form.Label> 
          <Form.Control placeholder="Date time" type="text" defaultValue={this.props.currentAd?.date} name="date" disabled={this.state.disabled} /><br />
          </Form.Group>
           <Form.Group className="mb-3" controlId="formBasicEmail"> 
          <Form.Label>Min Temp</Form.Label> 
          
          <Form.Control   placeholder="Number" type="text" defaultValue={this.props.currentAd?.min_temp} name="min_temp" disabled={this.state.disabled} /><br />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail"> 
        
          <Form.Label>Max Temp</Form.Label> 
          <Form.Control    placeholder="Number"type="text" defaultValue={this.props.currentAd?.max_temp} name="max_temp" disabled={this.state.disabled} /><br />
          <Form.Group className="mb-3" controlId="formBasicEmail"> 
          </Form.Group>
  
          <Form.Label>Wind Speed (day)</Form.Label> 
          <Form.Control  placeholder="Number"  type="text" defaultValue={this.props.currentAd?.wind_speed} name="wind_speed" disabled={this.state.disabled} /><br />
          <Form.Group className="mb-3" controlId="formBasicEmail"> 
          </Form.Group>
         
            <Form.Label> Wind Direction (day)</Form.Label> 
          <Form.Control   placeholder="Cardinal direction" type="text" defaultValue={this.props.currentAd?.wind_dir} name="wind_dir" disabled={this.state.disabled} /><br />
          <Form.Group className="mb-3" controlId="formBasicEmail"> 
          </Form.Group>
      
          <Form.Label>Wind Speed (night)</Form.Label> 
          
        <Form.Control   placeholder="Number" type="text" defaultValue={this.props.currentAd?.wind_speed_night} name="wind_speed_night" disabled={this.state.disabled} /><br />
        <Form.Group className="mb-3" controlId="formBasicEmail"> 
         
        </Form.Group>  
          <Form.Label>Wind direction (night)</Form.Label> 
          <Form.Control    placeholder="Cardinal direction"  type="text" defaultValue={this.props.currentAd?.wind_dir_night} name="wind_dir_night" disabled={this.state.disabled} /><br />
        
          </Form.Group>  
          <Button id = '101'  variant="dark" type="submit" disabled={this.state.disabled}> Submit </Button><br/>
          <br/>
        </Form>
        </Container>
        
      </>
    )
  }
}

export default Add;
