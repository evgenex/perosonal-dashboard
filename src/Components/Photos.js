import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import addPicture from './../Images/Add_picture.png';

class Photos extends Component {
  state = {
    photos: [],
    upload: '',
  }

  componentDidMount=()=>{
    this.getData();
  }
 getData = async () => {
    const url = 'http://localhost:5000/api/photos/list';
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({
        photos: data.result,
        })
      );
  }
  handleFileSelect=(event)=>{
    const file = event.target.files[0];
    const data = new FormData() 
    data.append('file', file);

    const url = 'http://localhost:5000/api/photos/';
    fetch(url, {
      method: 'POST',
      body: data,
      })
      .then(response => response.json())
      .then(result => {
        if(result.status === 'err'){
          console.log(result);
        }else{
          this.getData();
        };
      }
      );
  }
  

  render() {
    console.log(this.state.photos)
    if(this.props.preview){
      return (
        <div className="Preview">
          <div className="PreviewText" style={{marginTop: '-1rem'}}>
          {this.state.photos.slice(0, 4).map((item, index)=>
                  <img key={index} src={`http://localhost:5000/api/photos/${item}`} className='PhotoThumb' alt='photo'/>
                )}
          </div>
        </div>
      );
    }else{
      return(
        <div className='Content'>
        <div className='Header'>
          Photos
        </div>
        <div className='Main'>
          <div className='MainText'>
            <div className='PhotoWrapper'>
                <div>
                  <label htmlFor="file-input">
                    <img src={addPicture} alt='addPic' className='Photo PhotoButton'/>
                  </label>
                  <input id="file-input" type="file" className='FileUpload' accept="image/*" onChange={this.handleFileSelect}/>
                </div>
                {this.state.photos.map((item, index)=>
                <div>
                  <img key={index} src={`http://localhost:5000/api/photos/${item}`} className='Photo' alt='photo'/>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
      )
    }
  }
}

export default inject('appState')(observer(Photos));