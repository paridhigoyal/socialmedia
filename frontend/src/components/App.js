/**  App component is main component which is called first from index.js, contains routing
 * functionality to route different paths  */

 import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NavigationBar from './NavigationBar'
import Login from './Login'
import Signup from './Signup';
import Posts from './Posts';
import AddPost from './AddPost';
import Followers from './Followers';
import Following from './Following';
import UserProfiles from './UserProfiles';
import ForgetPassword from './ForgetPassword';
import ChangePassword from './ChangePassword';
import UserProfile from './UserProfile';
import {
  tryAutoSignIn,

} from '../actions/index'
import '../App.css'

function App(props) {
   const {isAuthenticated, tryAutoSignIn} = props

  useEffect(() => {
    tryAutoSignIn()
  
    
  }, [tryAutoSignIn]);

  return (
    <div className='App'>
    <Router>
      <div>
        <NavigationBar />
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
        <Route path="/user-info"
          render={() => {
            if (isAuthenticated) {
              return <UserProfile {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}>
        </Route>
        <Route exact path="/posts"
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
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    isAuthenticated: state.authReducer.token ? true : false,
    followerreducer: state.followerreducer,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  
    tryAutoSignIn: () => {
      dispatch(tryAutoSignIn());
    },
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)