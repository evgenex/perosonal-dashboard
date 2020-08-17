import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Chart from "react-google-charts";


class Clothes extends Component {
  state = {
    clothes: []
  }
  
  componentDidMount=()=>{
    this.getData();
  }
  getData = async () => {
    //const url = 'https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil';
    const url = 'http://localhost:5000/api/feeds/clothes';
    fetch(url)
      .then(response => response.json())
      .then(data => this.setData(data.payload));
  }
  setData=(data)=>{
    let clothes = [];
    const allClothes = data.map(element => {
      return(element.clothe)
    });
    const uniqueClothes = Array.from(new Set(allClothes))
    uniqueClothes.forEach(clothe=>{
      const clothDays = data.filter(item=>item.clothe===clothe).length;
      const thisClothe = [clothe, clothDays]
      clothes.push(thisClothe)
    })
    clothes.unshift(['Clothes', 'days worn'])
    this.setState({clothes: clothes})
  }

  render() {
    if(this.props.preview){
      return (
        <div className="Preview">
          <div className='ChartWrapper'>
            <Chart
              width={'15rem'}
              height={'8rem'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={this.state.clothes}
              options={{
                title: 'My daily clothes',
              }}
            />
          </div>
        </div>
      );
    }else{
      return(
        <div className='Content'>
        <div className='Header'>
          Clothes
        </div>
        <div className='Main'>
          <div className='ChartWrapper'>
            <Chart
              width={'60vw'}
              height={'60vh'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={this.state.clothes}
              options={{
                title: 'My daily clothes',
              }}
            />
          </div>
        </div>
      </div>
      )
    }
  }
}

export default inject('appState')(observer(Clothes));