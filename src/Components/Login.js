import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import './../App.css';
import LoginButton from './../Images/Login_button.png';

class Login extends Component {
  state = {
    signup: false,
    notFound: false,
    passMatch: true,
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  }

  login= async() => {
    const user = {
      username: this.state.username,
      password: this.state.password, 
    };

    fetch('http://localhost:5000/api/users/login', 
      {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
      })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.status === 'err'){
            console.log(result)
          }else if(result.status === 'OK' && result.result.length>0){
            this.updateUser(result.result[0].username);
          }else {
            this.setState({notFound: true})
          };
        },
      )
  }
  updateUser =(username)=>{
    this.props.appState.login(username);
  }

  validate =()=>{
    let valid = true;
    
    if(this.state.email === '' || this.state.username === '' || this.state.password === '' || this.state.confirmPassword === ''){
      valid = false;
    }else if(this.state.password !== this.state.confirmPassword){
      valid = false;
    }
    return(valid);
  }

  signUp = async() => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password, 
    };

    if(this.validate()){
      fetch('http://localhost:5000/api/users/signup', 
      {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
      })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.status === 'err'){
            console.log(result)
          }else {
            this.updateUser(result.result.username);
          }
        },
      )
    }else{
      this.setState({passMatch: false})
    }
    
  }

  

  

  render() {
    return (
      <div className='Content'>
        <div className='Header'>
          Dev Challenge
        </div>
        {
        !this.state.signup ? 
        <div className='LoginForm'>
          <form autoComplete="off" className='LoginFormRow' >
            <input type='text' placeholder='Username' onChange={(e)=>{this.setState({username: e.target.value})}} autoComplete="new-password"/>
            <input type='password' placeholder='Password' onChange={(e)=>{this.setState({password: e.target.value})}} autoComplete="new-password"/>
          </form>
          {this.state.notFound && 
            <div style={{marginTop: '2rem'}}>
              <p>User not found. Please try again or try signing up</p>
            </div>
          }
        </div>
        :
        <div className='LoginForm'>
          <div className='LoginFormRow'>
            <input type='text' placeholder='Username' onChange={(e)=>{this.setState({username: e.target.value})}} autoComplete="new-password"/>
            <input type='text' placeholder='Email' onChange={(e)=>{this.setState({email: e.target.value})}} autoComplete="new-password"/>
          </div>
          <div className='LoginFormRow'>
            <input type='password' placeholder='Password' onChange={(e)=>{this.setState({password: e.target.value})}} autoComplete="new-password"/>
            <input type='password' placeholder='Confirm password' onChange={(e)=>{this.setState({confirmPassword: e.target.value})}} autoComplete="new-password"/>
          </div>
          {!this.state.passMatch && 
            <div style={{marginTop: '2rem'}}>
              <p>Please check the details you entered. All fields must be filled and password must match.</p>
            </div>
          }
        </div>
        }
        <div className='LoginButtons'>
          <button onClick={this.state.signup ? this.signUp : this.login}><img src={LoginButton} style={{height: '3rem'}} alt='button'/></button>
          <p>New to the chalenge?  <a type='button' onClick={()=>{this.setState({signup: true})}}>Sign Up</a></p>
        </div>
      </div>
    );
  }
}

export default inject('appState')(observer(Login));