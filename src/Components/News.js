import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import {parseString} from 'xml2js';

class News extends Component {
 state = {
  news: {
    title: '',
    description: '',
    image: ''
  }
 }

  componentDidMount(){ 
    this.getData();
  }

  getData=async()=>{
    const url = 'http://localhost:5000/api/feeds/news';
    fetch(url)
      .then(response => response.text())
      .then(str => { 
        parseString(str, (err, result)=> { 
          const channel = result.rss.channel[0];
          const news = {
            title: channel.item[0].title[0],
            description: channel.item[0].description[0],
            image: channel.image[0].url,
          }
          //this.props.appState.getNews(news)
          this.setState({
            news: news,
          })
         })
        })
      }

  

  render() {
    if(this.props.preview){
      return (
        <div className="Preview">
          <div className="PreviewTitle">{`${this.state.news.title.substring(0, 16)} ...`}</div>
          <div className="PreviewText">{`${this.state.news.description.substring(0, 80)} ...`}</div>
        </div>
      );
    }else{
      return(
        <div className='Content'>
        <div className='Header'>
          News
        </div>
        <div className='Main'>
          <div className='MainImageWrapper'><img src={this.state.news.image} alt='BBC news rss' width='200'/></div>
          <div className='MainTitle'>{this.state.news.title}</div>
          <div className='MainText'>{this.state.news.description}</div>
        </div>
      </div>
      )
    }
  }
}

export default inject('appState')(observer(News));