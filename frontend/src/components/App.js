import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  // Redirect,
} from "react-router-dom";
import Login from './Login'
import Signup from './Signup';
import Posts from './Posts';
import AddPost from './AddPost';
export class App extends Component {
    render() {
      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li><Link to="/">Home</Link><br /></li>
                <li><Link to ="/login">Login</Link></li>
                <li><Link to ="/signup">Signup</Link></li>
                
              </ul>
            </nav>
          </div>
          <Switch>
            {/* <Route path="/">
              < Post />
  
            </Route> */}
            <Route path="/login"> <Login/></Route>
            <Route path="/signup"> <Signup/></Route>
            <Route path="/posts/"><Posts></Posts></Route>
            <Route path="/addpost"><AddPost/></Route>
  
          </Switch>
        </Router>
  
      )
    }
  }
  
  export default App