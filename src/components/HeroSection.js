import React from 'react'
import '../App.css';
import { Button } from './Button'
import './HeroSection.css';
import { createBrowserHistory } from 'history';
import { GolfCourseTwoTone } from '@material-ui/icons';

function HeroSection() {
    const history = createBrowserHistory({forceRefresh:true});

    const goTo  = () =>{
        if(localStorage.getItem("currentID") === '')
        {  history.push({
            pathname: '/login',
          });}
        else {
            history.push({
                pathname: '/home',
              });
        }}

    return (
        <div className='hero-container'>
            <h1>EXPLORE, DREAM, DISCOVER</h1>

            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--outline'
                    buttonSize='btn--large' onClick={goTo}>
                    GET STARTED
                </Button>
            </div>

        </div>
    )
}

export default HeroSection