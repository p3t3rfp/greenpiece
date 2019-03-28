import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Park from './components/Park'
import styled from 'styled-components'
import img from './images/redwoodBackground.jpeg'
import bgImg from './images/natalie-thornley-148086-unsplash.jpg'
import UserParks from './components/UserParks';

const RedwoodBackground = styled.div`
  background-image: url(${img});
  background-size: contain;
  background: cover cover;
  overflow: hidden;
`

// const Background = styled.div`
//   background-image: url(${bgImg});
//   background-size: cover;
//   height: 100%;
//   overflow: hidden;

// `

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
              <Route exact path='/user/:userId/parks' component={UserParks} />
              <Route exact path='/parks/:parkId' component={Park} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
