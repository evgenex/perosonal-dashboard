import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { observer, inject } from 'mobx-react'
import Background from './Images/Background.png';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Weather from './Components/Weather';
import News from './Components/News';
import Photos from './Components/Photos';
import Sport from './Components/Sport';
import Tasks from './Components/Tasks';
import Clothes from './Components/Clothes';


class App extends Component {
  render() {
    const {appState} = this.props;
    return (
      <div className='App'>
        <Router>
            <img src={Background} alt='background' className='Background'/>
            {
            appState.appRoutine.loggedIn ? 
            <div>
              <Route exact path="/" component={Home}/>
              <Route path="/Login" component={Login}/>
              <Route exact path="/weather" component={Weather}/>
              <Route exact path="/news" component={News}/>
              <Route exact path="/photos" component={Photos}/>
              <Route exact path="/sport" component={Sport}/>
              <Route exact path="/tasks" component={Tasks}/>
              <Route exact path="/clothes" component={Clothes}/>
            </div>
            : 
            <div>
              <Login/>
            </div>
            }
        </Router>
      </div>
    );
  }
}

export default inject('appState')(observer(App));
