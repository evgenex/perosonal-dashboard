import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import PlusButton from './../Images/Plus_button.png';

class Tasks extends Component {
  state = {
    todos: [],
    addTodo: '',
  }

  componentDidMount=()=>{
    this.getData();
  }
 getData = async () => {
    const url = 'http://localhost:5000/api/todos';
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({
        todos: data.result,
        })
      );
  }

  updateTodo = (id, checked)=>{
    const qry = {
      id: id,
      completed: !checked,
    }
    fetch('http://localhost:5000/api/todos/update', 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(qry),
      })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.status === 'err'){
            console.log(result)
          } else {
            this.getData();
          };
        },
      )
}

 addToDo = async () =>{
  const newTodo = {
     id: '',
     title: this.state.newTodo,
     completed: false,
   };

   fetch('http://localhost:5000/api/todos/insert', 
     {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(newTodo),
     })
     .then(res => res.json())
     .then(
       (result) => {
         if(result.status === 'err'){
           console.log(result)
         }else{
           this.getData();
         };
       },
     )
   this.setState({newTodo: ''});
}

  render() {
    if(this.props.preview){
      return (
        <div className="Preview">
          <div className="PreviewTitle">{'Tasks'}</div>
          <div className="PreviewText">
            <ul>
              {this.state.todos.slice(0,2).map((item, index)=>
                <li key={index}>{item.title}</li>
              )}
            </ul></div>
        </div>
      );
    }else{
      return(
        <div className='Content'>
        <div className='Header'>
          Tasks
        </div>
        <div className='Main'>
          <div className='MainTitle'>
            <input type='text' value={this.state.newTodo} onChange={(e)=>{this.setState({newTodo: e.target.value})}} style={{minWidth: '30vw'}}/>
            <button onClick={this.addToDo}><img src={PlusButton} style={{height: '2rem'}} alt='plusbutton'/></button>
          </div>
          <div className='MainText'>
            {this.state.todos.map((item, index)=>
              <div key={index} className='Tasks'>
                <div className='CheckBoxWrapper'>
                  <input 
                    type="checkbox" 
                    className='Checkbox' 
                    id={item.id} 
                    checked={item.completed}
                    onChange={()=>{this.updateTodo(item.id, item.completed)}}/>
                  </div>
                <div>{item.title}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      )
    }
  }
}

export default inject('appState')(observer(Tasks));