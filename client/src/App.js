import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import User from './components/User'
import Parks from './components/Parks'
import Park from './components/Park'
import styled from 'styled-components'
import img from './images/redwoodBackground.jpeg'
import UserParks from './components/UserParks';

const RedwoodBackground = styled.div`
  background-image: url(${img});
  background-size:contain;
  background: cover;
`

class App extends Component {
  render() {

    return (
      <div>
        <Router>
          <RedwoodBackground>
            <Navbar />
          </RedwoodBackground>
          <div>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/parks' component={Parks} />
              <Route exact path='/parks/:parkId' component={Park} />
              <Route exact path='/user/:userId/parks' component={UserParks} />
              <Route exact path='/user/:userId/parks/:parkId' component={Park} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
