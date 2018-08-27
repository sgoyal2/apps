import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";

import "./App.css";
import Posts from "./components/posts/Posts";
import Navbar from './components/layout/Navbar';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    //store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <Navbar/>
            <Route exact path="/" component={Register} />
            <Route exact path="/login" component={Login} />
        
            <Route exact path="/feed" component={Posts} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
