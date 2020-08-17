import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Rain from './../Images/Rain_icon.png';
import Sun from './../Images/Sun_icon.png';
import Clouds from './../Images/Clouds_icon.png';

class Weather extends Component {
  componentDidMount=()=>{
    navigator.geolocation.watchPosition(this.getGeo);
  }

  getGeo = async(position)=>{
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=894b79ab11c598b1fb77e95d83f5a0b6`);
    const data = await res.json()
    const weather = {
      town: data.name,
      temp: data.main.temp,
      weather: data.weather[0].main,
    }
    this.props.appState.getWeather(weather);
  }
  getWeatherIcon=(weather)=>{
    let icon = null;
    if(weather==='Rain' || weather==='Drizzle'){
      icon = Rain
    }else if(weather === 'Clear'){
      icon = Sun
    }else {
      icon = Clouds
    }

    return(icon)
  }

  render() {
    const {appState} = this.props;
    if(this.props.preview){
      return (
        <div className="Preview">
          <div className="WeatherIcconWrapper">
            <img src={this.getWeatherIcon(appState.weather.weather)} style={{height: '5rem'}} alt="weater-icon"/>
            <div>{appState.weather.temp} C</div>
          </div>
          <div style={{marginTop: '1rem'}}>{appState.weather.town}</div>
        </div>
      );
    }else{
      return(
        <div className='Content'>
        <div className='Header'>
          Weather
        </div>
        <div className='Main'>
          <div >
            <div className="WeatherIcconWrapper">
              <img src={this.getWeatherIcon(appState.weather.weather)} style={{height: '5rem'}} alt="weater-icon"/>
              <div>{appState.weather.temp} C</div>
            </div>
            <div className="MainTitle">{appState.weather.town}</div>
          </div>
        </div>
      </div>
      )
    }
  }
}

export default inject('appState')(observer(Weather));