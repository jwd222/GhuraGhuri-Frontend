import './App.css';
import Navbar from './components/Navbar';
import Home_wo_Login from './components/pages/Home_wo_Login';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Discover from './components/pages/Discover';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history'
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Myplans from './components/pages/Myplans';
import Addplan from './components/pages/Addplan';
import Plandetails from './components/pages/Plandetails';
import Map from './components/pages/Map';
import AllArticle from './components/pages/AllArticle';
import ArticleDetails from './components/pages/ArticleDetails';
import MyArticles from './components/pages/MyArticles';
import MyArticleDetails from './components/pages/MyArticleDetails';

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
        <Route path='/myplans' component={Myplans}/>
        <Route path='/addplan' component={Addplan}/>
        <Route path='/plandetails' component={Plandetails}/>
        <Route path='/allarticles' component={AllArticle}/>
        <Route path='/myarticles' component={MyArticles}/>
        <Route path='/articledetails' component={ArticleDetails}/>
        <Route path='/myarticledetails' component={MyArticleDetails}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;