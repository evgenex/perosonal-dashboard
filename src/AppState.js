import { observable, action, decorate } from "mobx";

class AppState {
    appRoutine = {
        currentPage: '',
        loggedIn: false,
        loading: false,
    }
    user = {
      username: '',
    }
    weather = {
      town: '',
      temp: '',
      weather: '',
    }
    sport = {
      teams: [],
      stats: [],
    }

  changePage(newPage){
    this.appRoutine.currentPage = newPage; 
  }
  login(user){
    this.appRoutine.loggedIn = true; 
    this.user.username = user;
  }
  getWeather(weather){
    this.weather = weather;
  }
  getSport(sport){
    this.sport = sport;
  }
}

decorate(AppState, {
  appRoutine: observable,
  user: observable,
  weather: observable,
  news: observable,
  sport: observable,
  changePage: action,
  login: action,
  getWeather: action,
  getSport: action
})

export default AppState;