import React, { Component } from 'react';
import './App.css';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../src/components/auth/Login';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Route exact path="/" component={Register} />
      <Footer />
      </div>
      </Router>
    
    );
  }
}

export default App;
