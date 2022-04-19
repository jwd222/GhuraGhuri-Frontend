import './App.css';
import ReactDOM from "react-dom";
import Navbar from './components/Navbar';
import Home_wo_Login from './components/pages/Home_wo_Login';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Discover from './components/pages/Discover';
import Profile from './components/pages/Profile';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HeroSection from './components/HeroSection';
import { createBrowserHistory } from 'history'
import Home from './components/pages/Home';
import Map from './components/pages/Map';



function App() {
  const history = createBrowserHistory();
  return (
    <>
    <Router history={history}>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home_wo_Login}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/home' component={Home}/>
        <Route path='/discover' component={Discover}/>
        <Route path='/map' component={Map}/>
        <Route path='/profile' component={Profile}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
