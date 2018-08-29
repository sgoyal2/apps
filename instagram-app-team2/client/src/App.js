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
import Post from "./components/post/Post";
import Navbar from './components/layout/Navbar';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile/CreateProfile';
import {clearCurrentProfile} from './actions/profileAction';
import HandleProfile from './components/profile/HandleProfile';


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
    store.dispatch(clearCurrentProfile());
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
          <div className="container"> 
            <Route exact path="/" component={Register} />
            <Route exact path="/login" component={Login} />
        
            <Route exact path="/feed" component={Posts} />
            <Route exact path="/post/:id" component={Post}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/create-profile" component={CreateProfile} />
            <Route exact path="/profile/:handle" component={HandleProfile} />
            
           </div> 
           <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
