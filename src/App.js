import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios' 

class App extends Component {


  componentDidMount(){
    let  host = "http://122.155.201.108:4042/api/Tags";
  }


  test = () =>{
    console.log("test")
  }


  render() {
    return (
      <div className="App">
         test Ving
      </div>
    );
  }
}

export default App;
