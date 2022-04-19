import './App.css';
import ReactDOM from "react-dom";
import Navbar from './components/Navbar';
import Home_wo_Login from './components/pages/Home_wo_Login';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Discover from './components/pages/Discover';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HeroSection from './components/HeroSection';
import { createBrowserHistory } from 'history'
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Myplans from './components/pages/Myplans';
import Addplan from './components/pages/Addplan';
import Plandetails from './components/pages/Plandetails';

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
        <Route path='/profile' component={Profile}/>
        <Route path='/myplans' component={Myplans}/>
        <Route path='/addplan' component={Addplan}/>
        <Route path='/plandetails' component={Plandetails}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
