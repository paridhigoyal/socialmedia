import React, { Component } from "react"
import { Redirect, Link } from 'react-router-dom'
import { connect } from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress';
import { login } from "../actions/index"
import { Button } from 'react-bootstrap';

class Login extends Component {
  state = {
    username: "",
    password: "",
    progress: false
  }
  render() {
    const { isAuthenticated, token } = this.props.authReducer
    // console.log(token)
    const { progress } = this.state
    if (isAuthenticated) {
      return <Redirect to='/posts/' />
    }
    return (
      <div className="login-page">
        <div className="login-page-content">
          <div className="login-page-content-inner">
            <form onSubmit={this.onFormSubmit.bind(this)} >
              <div >
                <label>Username</label>
                <input
                  value={this.state.username}
                  name="username"
                  type="text"
                  onChange={this.onInputChange.bind(this)}
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  value={this.state.password}

                  name="password"
                  type="password"
                  onChange={this.onInputChange.bind(this)}
                  placeholder="Password"
                />
              </div>
              <button style={{ marginRight: "5px" }} > Login </button>
              <CircularProgress style={progress ? { display: "inline-block" } : { display: "none" }} />
              <p className="text-helper">
                You dont have an account yet Signup from <Link to="/signup">here</Link><br />

                <Link className="nav-link" to="/forgetpassword">Forget Password</Link>

              </p>
            </form>
          </div>
        </div>
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
      this.setState({
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