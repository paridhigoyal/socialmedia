/** Nav component is common component for all pages */

import React, { Component } from "react"
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from "react-router-dom"
import { Button } from '@material-ui/core';
import SearchUserPost from './SearchUserPost';
import { connect } from 'react-redux'
import { logout } from '../actions/index'
import styled from 'styled-components';
import InstagramIcon from '@material-ui/icons/Instagram';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PersonIcon from '@material-ui/icons/Person';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

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
          <Navbar.Brand href="/posts"><InstagramIcon/>Social Life!....</Navbar.Brand>
         
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
         
          <SearchUserPost />
      
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="ml-auto">
            <Link className="btn btn-sm btn-outline-info" to="/posts">
             <HomeIcon /> Home<i className="fa fa-user ml-1"></i>
             </Link> &nbsp;&nbsp;&nbsp;
            <Link className="btn btn-sm btn-outline-info" to="/user-info">
           < PersonIcon/> {user && user.username}<i className="fa fa-user ml-1"></i>
             </Link> &nbsp; &nbsp;&nbsp;
             <Link className="btn btn-sm btn-outline-info" to="/addpost"><PostAddIcon/>
            Post Something..<i className="fa fa-user ml-1"></i>
             </Link> &nbsp;&nbsp;&nbsp;
             
             
             <Link className="btn btn-sm btn-outline-info" to="/userprofiles">
              Profiles..<i className="fa fa-user ml-1"></i>
             </Link> &nbsp;&nbsp;&nbsp;
            
           
            </Nav>
          <Button type='submit' style={{color:'white'}} onClick={this.props.logout}
            to="/">
          <PowerSettingsNewIcon/>Logout
          </Button>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
      )
    }
    else {
      return (
        <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/login"><InstagramIcon/>Social Life!....</Navbar.Brand>
         
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="ml-auto">
           
            <Link className="btn btn-sm btn-outline-info" to="/login">
            <LockOpenIcon /> Login<i className="fa fa-user ml-1"></i>
             </Link> &nbsp; 
             <Link className="btn btn-sm btn-outline-info" to="/signup">
             <PersonAddIcon />SignUp<i className="fa fa-user ml-1"></i>
             </Link> &nbsp;
            
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>

      )
    }
  }
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer }
}

export default connect(mapStateToProps, { logout })(NavigationBar)