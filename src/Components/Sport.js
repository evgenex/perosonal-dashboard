import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {readString} from 'react-papaparse';

class Sport extends Component {
  state = {
    teams: [],
    stats: [],
    selectTeam: 'Juventus',
  }


  componentDidMount(){ 
    this.getData();
  }

  getData=async()=>{
    const url = 'http://www.football-data.co.uk/mmz4281/1718/I1.csv';
    fetch(url)
      .then(response => response.text())
      .then(str => { 
        const json = readString(str);
        this.readData(json.data)
        })
  }
  readData=(data)=>{
    let teams = [];
    let stats = [];
    data.map((item)=>{
      const match = {
        homeTeam: item[2],
        awayTeam: item[3],
        goalsHome: item[4],
        goalsAway: item[5],
      }
      if(match.homeTeam!==undefined && match.homeTeam !=='HomeTeam'){
        stats.push(match);
        if(teams.indexOf(match.homeTeam)<0){
          teams.push(match.homeTeam);
        } else if (teams.indexOf(match.awayTeam)<0){
          teams.push(match.awayTeam);
        }
      }
    })
    
    this.setState({
      teams: teams,
      stats: stats,
    })
  }

  selectWinMatches=(team)=>{
    const stats = this.state.stats;
    let winMatches= [];
    stats.map(item=>{
      if(item.homeTeam === team && item.goalsHome > item.goalsAway){
        winMatches.push(item)
      }else if(item.awayTeam === team && item.goalsAway > item.goalsHome){
        winMatches.push(item)
      }
    })
    return(winMatches);
  }
  

  render() {

    if(this.props.preview){
      return (
        <div className="Preview">
          <div className="PreviewTitle">{this.state.teams[0]}</div>
          <div className="PreviewText">{ this.selectWinMatches(this.state.teams[0]).slice(0, 2).map((item, index)=>
            <div key={index} className="SportStatsPrev">
              <span>{item.homeTeam} vs {item.awayTeam}</span>
              <span>{item.goalsHome} : {item.goalsAway}</span>
            </div>
          )
          }</div>
        </div>
      );
    }else{
      return(
        <div className='Content'>
        <div className='Header'>
          Sport
        </div>
        <div className='Main'>
          <div className='MainTitle'>
          <input 
            type='text' 
            placeholder='Enter team name' 
            value={this.state.selectTeam} 
            onChange={(e)=>{this.setState({selectTeam: e.target.value})}}/>
          </div>
          <div className='MainText'>
            {
            this.selectWinMatches(this.state.selectTeam).map((item, index)=>
            <div key={index} className="SportStats">
              <span>{item.homeTeam} vs {item.awayTeam}</span>
              <span>{item.goalsHome} : {item.goalsAway}</span>
              </div>
            )}
            </div>
        </div>
      </div>
      )
    }
  }
}

export default inject('appState')(observer(Sport));