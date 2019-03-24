import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import User from './components/User'
import Parks from './components/Parks'
import Park from './components/Park'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar />
          </div>
          <div>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/parks' component={Parks} />
              <Route exact path='/parks/:parkId' component={Park} />
              <Route exact path='/user/:userId/parks' component={User} />
              <Route exact path='/:userId/parks' component={Parks} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
