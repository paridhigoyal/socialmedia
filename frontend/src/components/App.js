import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import {setConfig} from '../actions/index'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Nav from './Nav'
import Login from './Login'
import Signup from './Signup';
import Posts from './Posts';
import AddPost from './AddPost';
import Followers from './Followers';
import Following from './Following';
import UserProfiles from './UserProfiles';
import ForgetPassword from './ForgetPassword';
import ChangePassword from './ChangePassword'
import { baseURL } from '../utility';
function App(props) {

  const { isAuthenticated } = props

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   console.log(token)
  //   if (token) {
  //     // const config = setConfig(getState, resetParameter)
  //     const requestConfig = {
  //       method: 'GET',
  //       headers: {
  //         Authorization: token ? `token ${token}` : 'Authorization failed',
  //         'Content-Type': 'application/json',
  //       }
  //     };

  //     fetch(`${baseURL}/rest-auth/user`, requestConfig).then(response => {
  //       console.log(response);
  //     })
  //   }
  // }, []);

  return (
    <Router>
      <div>
        <Nav />
      </div>
      <Switch>
        <Route path="/login"> <Login /></Route>
        <Route path="/signup"> <Signup /></Route>
        <Route path="/forgetpassword"><ForgetPassword />
        </Route>
        <Route path="/changepassword"
          render={() => {
            if (isAuthenticated) {
              return <ChangePassword {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}></Route>
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
        <Route path='/followers/:id/'
          render={() => {
            if (isAuthenticated) {
              return <Followers />;
            } else {
              return <Redirect to="/login" />;
            }
          }}>
        </Route>
        <Route path='/following/:id/'
          render={() => {
            if (isAuthenticated) {
              return <Following {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }} />

        <Route path='/userprofiles'
          render={() => {
            if (isAuthenticated) {
              return <UserProfiles {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }} />



      </Switch>
    </Router>

  )
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    isAuthenticated: state.authReducer.isAuthenticated,
    followerreducer: state.followerreducer,

  };
};




export default connect(mapStateToProps, null)(App)