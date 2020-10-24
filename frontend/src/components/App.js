import React from 'react';
// import { logout } from '../actions/index';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Nav from './Nav'
import Login from './Login'
import Signup from './Signup';
import Posts from './Posts';
import AddPost from './AddPost';
function App(props) {

  const { isAuthenticated } = props
  return (
    <Router>
      <div>
        <Nav />
      </div>
      <Switch>
        <Route path="/login"> <Login /></Route>
        <Route path="/signup"> <Signup /></Route>

        <Route path="/posts"
          render={() => {
            if (isAuthenticated) {
              return <Posts {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}>
        </Route>
        <Route path="/addpost"
          render={() => {
            if (isAuthenticated) {
              return <AddPost {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}>

        </Route>

      </Switch>
    </Router>

  )
}
const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    isAuthenticated: state.authReducer.token ? true : false,
  };
};




export default connect(mapStateToProps, null)(App)