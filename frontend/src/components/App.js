import React, { Component } from 'react';
import {
  BrowserRouter as Router,
//   Route,
  Link,
  Switch
} from "react-router-dom";
export class App extends Component {
    render() {
      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link><br /></li>
              </ul>
            </nav>
          </div>
          <Switch>
            {/* <Route path="/">
              < Post />
  
            </Route>
            <Route path="/user"> <UserLogin /></Route> */}
  
          </Switch>
        </Router>
  
      )
    }
  }
  
  export default App