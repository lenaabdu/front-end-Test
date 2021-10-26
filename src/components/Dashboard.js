import React from 'react';
import Add from "./Add"
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapTable from 'react-bootstrap-table-next';
import FormControl from 'react-bootstrap/FormControl';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import paginationFactory from 'react-bootstrap-table2-paginator';

import Form from 'react-bootstrap/Form';
import { ApiClient } from '../apiClient';
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ads: [],
      seafilter:"",
      currentAd: undefined
    };
    this.client = new ApiClient(() => this.state.token, () => this.logout())
  }
// filter  function 
  handleChange =(e) => {
    this.setState({
       seafilter: e.target.value });
  };
  // Add new data fuction
  refreshList(){
    this.props.client.getAds()
    .then((response) => this.setState({ ads: response.data }))
  }
// remove button function 
  removeAdvert(id){
    this.props.client.removeAd(id)
    .then(this.refreshList())
  }
// update button functin function
  updateAdvert(ad){
    this.setState({currentAd: ad})
    document.getElementById('101').textContent = 'Update';
    this.refreshList()
  }

  componentDidMount() {
    this.refreshList()
  }
  // log out function 
  logout() {
    window.localStorage.removeItem("token")
    this.setState({ token: undefined });
    window.location.reload();
}

  render() {
    /* A variable that specifies number of page in the table    */ 
    const pagination = paginationFactory({
      page: 5
    });
   const columns = [{
      dataField: "location" ,
      text: "Location",
      sort: true
    },
  
    {
      dataField:  "date",
      text: 'Date',
      sort: true
    }, {
      dataField: 'min_temp',
      text: ' Max Temp',
      sort: true
    }
  
    , {
      dataField: 'max_temp',
      text: ' Max Temp',
      sort: true
    }
    , {
      dataField: 'wind_speed',
      text: 'Wind Speed (day)',
      sort: true
    },
    {
      dataField: 'wind_dir',
      text: ' Wind Dir (day)',
      sort: true
    }
  
    , {
      dataField: 'wind_speed_night',
      text: ' Wind Speed (night)',
      sort: true
    }
    , {
      dataField: 'wind_dir_night',
      text: ' Wind direction (night)',
      sort: true

    },  {
      dataField: "_id",
      text: 'Action',
      
      formatter:(current,row)=> (
       
          <div>
              <button onClick={()=> this.removeAdvert(current)}> Delete</button>
              <button  onClick={()=> this.updateAdvert(row)}>Edit</button>
          </div>
     )
    }
  
  ];
/*   variables for the filter searcher function  */ 
    const  { seafilter, ads } = this.state;
    const lowercasedFilter = seafilter.toLowerCase();
    const  filteredData = ads.filter(current=> {
      return Object.keys(current).some(key =>
        typeof current[key] === "string" && current[key].toLowerCase().includes(lowercasedFilter)
      )
    });
    return (
      <>
      <Router>
        <Navbar   bg="dark" variant="dark" fixed="top"  expand="md">
        <Navbar.Brand>Dasboard</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link className="nav-link" to="/Logout"  onClick={() => this.logout()}>logout</Link>

    </Nav>
    <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={seafilter} onChange={(e) => this.handleChange(e)}
        />
        <Button variant="info">Search</Button>
      </Form>
        </Navbar.Collapse>
     </Navbar>
      
<Container className=" home" >
  


          </Container >
        <div className=" home" >
  
  <BootstrapTable
           bootstrap4
        keyField= {"_id"}
        data={filteredData}
        columns={columns}
        noDataIndication="No Interfaces available"
        pagination={ pagination }
        defaultSorted={[{ dataField: "_id", order: "asc" }]}
      />    
      

    
       
        </div >
   
        <br /><br />
         <Add client={this.props.client} refreshList={() => {
          this.refreshList()
          this.setState({
            currentAd: undefined})
          }} 
          currentAd={this.state.currentAd}/>
        </Router>
      </>
    )

  }
}

export default Dashboard;
