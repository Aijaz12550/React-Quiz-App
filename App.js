import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Create, Timer} from './Components/Quiz'

class App extends Component {
  constructor(){
    super()
    this.state={
      categories:null
    }
  }

  componentDidMount(){
    fetch('https://opentdb.com/api.php?amount=10')
.then(response => response.json())
.then(data => {
  this.setState({categories:data}) // Prints result from `response.json()` in getRequest
  
})
.catch(error => console.error(error))

  }
  render() {
    let { categories} = this.state
    
    return (
      <div className="App">
        <header className="App-header">
         <h1>Quiz App</h1>
        </header>
   
        {
         

          <Create
          categories = {categories}
          />
        }
      </div>
    );
  }
}

export default App;
