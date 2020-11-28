/** Nav component is common component for all pages */

import React, { Component } from "react"
import { Navbar, Nav, Form,FormControl} from 'react-bootstrap';
import { Link } from "react-router-dom"
import { Button } from '@material-ui/core';
import SearchUserPost from './SearchUserPost';
import { connect } from 'react-redux'
import { logout } from '../actions/index'
import styled from 'styled-components';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }

`;

class NavigationBar extends Component {

  render() {
    const { isAuthenticated } = this.props.authReducer
    if (isAuthenticated) {
      const { user } = this.props.authReducer

      return (
        <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/posts">Social Life!....</Navbar.Brand>
         
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Form className="form-center">
          <SearchUserPost />
            {/* <FormControl type="text" placeholder="Search" className="" /> */}
           
          </Form>
        
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="ml-auto">
           
            <Link className="btn btn-sm btn-outline-info" to="/user-info">
               {user && user.username}<i className="fa fa-user ml-1"></i>
             </Link> &nbsp; 
             <Link className="btn btn-sm btn-outline-info" to="/changepassword">
               changepassword<i className="fa fa-user ml-1"></i>
             </Link> &nbsp; 
             <Link className="btn btn-sm btn-outline-info" to="/userprofiles">
             User Profiles..<i className="fa fa-user ml-1"></i>
             </Link> &nbsp;
             <Link className="btn btn-sm btn-outline-info" to="/addpost">
             Post Something...<i className="fa fa-user ml-1"></i>
             </Link> &nbsp;
             <Link className="btn btn-sm btn-outline-info" to="/posts">
             posts<i className="fa fa-user ml-1"></i>
             </Link>
            </Nav>
            <Button type='submit' style={{color:'White'}} onClick={this.props.logout} startIcon={<ExitToAppIcon  />}
            to="/">
          Logout
          </Button>
            {/* <button onClick={this.props.logout}
              className="btn btn-sm btn-outline-info" to="/">
              Logout
               </button> */}

          </Navbar.Collapse>
        </Navbar>
      </Styles>
      )
    }
    else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Register</Link>
          </li>

        </ul>
      )
    }
  }
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer }
}

export default connect(mapStateToProps, { logout })(NavigationBar)