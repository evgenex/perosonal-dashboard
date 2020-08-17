import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './../App.css';
import Container from './../Images/Container.png';
import Weather from './Weather';
import News from './News';
import Sport from './Sport';
import Photos from './Photos';
import Tasks from './Tasks';
import Clothes from './Clothes';

const routes = [
  {route: '/weather', text: 'Weather', preview: <Weather preview={true}/>},
  {route: '/news', text: 'News', preview: <News preview={true}/>},
  {route: '/sport', text: 'Sport', preview: <Sport preview={true}/>},
  {route: '/photos', text: 'Photos', preview: <Photos preview={true}/>},
  {route: '/tasks', text: 'Tasks', preview: <Tasks preview={true}/>},
  {route: '/clothes', text: 'Clothes', preview: <Clothes preview={true}/>},
]

class Home extends Component {
  render() {
    const {appState} = this.props;
    return (
      <div className='Content'>
        <div className='Header'>
          Hello {appState.user.username}
        </div>
        <div className='Home'>
          {routes.map((item, index)=>
            <Link to={item.route} key={index} style={{textDecoration: 'none'}}>
              <div className='ThumbsWrapper'>
                <div className='Thumb'>
                    <img src={Container} className='ThumbContainerBackground' alt='thumb'/>
                    <div className='ThumbTitle'>{item.text}</div>
                    <div>{item.preview}</div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default inject('appState')(observer(Home));