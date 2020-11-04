import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { logout } from '../actions/index'


class Nav extends Component {

  render() {
    const { isAuthenticated } = this.props.authReducer
    if (isAuthenticated) {
      const { username, pk } = this.props.authReducer.user
      return (

        <ul className="navbar-nav ml-auto">
          <h2>Welcome to Social Life!....</h2>
          {/* {console.log(pk)} */}
          <li className="nav-item" style={{ margin: "auto 0" }}>
            <Link className="btn btn-sm btn-outline-info" to="/user-info">
              {username}<i className="fa fa-user ml-1"></i>
            </Link>

          </li>

          <li className="nav-item" style={{ margin: "auto 0" }}>
            <button onClick={this.props.logout}
              className="btn btn-sm btn-outline-danger ml-2" to="/">
              Logout
                        </button>
          </li>
          <br />
          <Link to={`/addpost`}>
            <button style={{ backgroundColor: '#b92b27', borderColor: '#b92b27' }}>
              Post Something...
    </button>
          </Link>
          <br />
          <Link to={`/userprofiles`}>
            <button style={{ backgroundColor: '#b92b27', borderColor: '#b92b27' }}>
              User Profiles..
            </button>
          </Link>
        </ul>

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
export default connect(mapStateToProps, { logout })(Nav)