import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Loopback, config } from './lib';

config.set('baseUrl','http://122.155.201.108:4042/api/');
class App extends Component {


  componentDidMount(){
    let  host = "http://122.155.201.108:4042/api/Tags";
  }


  test = () =>{
    console.log("test")
  }


  getQuery = async () =>{
    const Tags = new Loopback('Tags')
    let  res  =  await Tags.find() ;
    console.log("res" , res);

  }


  render() {
    // const Tags = new Loopback('Tags');
    // console.log("get  model:",Tags.getModel());
    // console.log("Url :",Tags.find({where: {name: 'John'}, limit: 3})); 
    this.getQuery();
    return (
      <div className="App">
         test Ving
      </div>
    );
  }
}

export default App;
