import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home'

class App extends Component {

  render() {
    return (
      <div className="App" >
        <a href="http://localhost:3000/login">Log in</a>
        <Router>
          <Route path="/success" component={Home} />
        </Router>
      </div>
    );
  }
}

export default App;
