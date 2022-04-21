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
import AboutUs from './components/pages/AboutUs';
import Fileupload from './components/pages/Fileupload';
import PlanLocation from './components/pages/PlanLocation';
import LocationDetails from './components/pages/LocationDetails';

function App() {
  const history = createBrowserHistory({forceRefresh:true});
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
        <Route path='/aboutus' component={AboutUs}/>
        <Route path='/plandetails' component={Plandetails}/>
        <Route path='/allarticles' component={AllArticle}/>
        <Route path='/myarticles' component={MyArticles}/>
        <Route path='/articledetails' component={ArticleDetails}/>
        <Route path='/locationdetails' component={LocationDetails}/>
        <Route path='/myarticledetails' component={MyArticleDetails}/>
        <Route path='/fileupload' component={Fileupload}/>
        <Route path='/planlocation' component={PlanLocation}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;