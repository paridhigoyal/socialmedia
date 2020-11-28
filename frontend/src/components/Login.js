/** Login Component is for login page having fields username and password if user
 * forgets credentials than click on forget poassword */

import React, { Component } from "react"
import { Redirect, Link } from 'react-router-dom'
import { connect } from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress';
import { login } from "../actions/index"
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';

class Login extends Component {
  state = {
    username: "",
    password: "",
    progress: false
  }

  render() {
    const { isAuthenticated } = this.props.authReducer
    const { progress } = this.state
    if (isAuthenticated) {
      return <Redirect to='/posts' />
    }

    return (
      <div className='Div'>
        <form onSubmit={this.onFormSubmit.bind(this)} >
          <FormControl>
            <InputLabel>Username</InputLabel>
            <Input type='text'
              value={this.state.username}
              name="username"
              onChange={this.onInputChange.bind(this)}
              placeholder="Username" />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input value={this.state.password}
              name="password"
              type="password"
              onChange={this.onInputChange.bind(this)}
              placeholder="Password" />
          </FormControl>
          <br /><br />
          <Button type='submit' onClick={this.onFormSubmit.bind(this)}
            disabled={(!this.state.password)}
            variant="contained" color="secondary">
            Login
          </Button>

          <CircularProgress style={progress ? { display: "inline-block" } : { display: "none" }} />
        </form>
        <p className="text-helper">
          You dont have an account yet Signup from <Link to="/signup">here</Link><br />
          <Link className="nav-link" to="/forgetpassword">Forget Password</Link>
        </p>
      </div>
    )
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onFormSubmit(e) {
    e.preventDefault()
    const { progress, ...values } = this.state
    this.setState({ progress: true })
    this.props.login(values, () => {
      this.setState
        ({
          progress: false,
          username: "",
          password: ""
        })
    })
  }
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer }
}
export default connect(mapStateToProps, { login })(Login)