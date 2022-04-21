import React from 'react'
import '../App.css';
import { Button } from './Button'
import './HeroSection.css';
import { createBrowserHistory } from 'history';
//import AliceCarousel from 'react-alice-carousel';
//import "react-alice-carousel/lib/alice-carousel.css";
//import image1 from '../assets/background1.jpg';
//import image2 from '../assets/background2.jpg';
//import image3 from '../assets/background3.jpg';
//import image4 from '../assets/background4.jpg';
//import image5 from '../assets/background5.jpg';
//import image6 from '../assets/background6.jpg';

import { GolfCourseTwoTone } from '@material-ui/icons';

function HeroSection() {
    const history = createBrowserHistory({ forceRefresh: true });

    const goTo = () => {
        if (localStorage.getItem("currentID") === '') {
            history.push({
                pathname: '/login',
            });
        }
        else {
            history.push({
                pathname: '/home',
            });
        }
        /*
        
            <AliceCarousel autoPlay autoPlayInterval={3000}>
                <img src={image1} classname="sliderimg" />
                <img src={image2} classname="sliderimg" />
                <img src={image3} classname="sliderimg" />
                <img src={image4} classname="sliderimg" />
                <img src={image5} classname="sliderimg" />
                <img src={image6} classname="sliderimg" />
            </AliceCarousel>
        */
    }

    return (
        <div className='hero-container'>
            
            <h1>EXPLORE, DREAM, DISCOVER</h1>

            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--outline'
                    buttonSize='btn--large' onClick={goTo}>
                   <h3>GET STARTED </h3> 
                </Button>
            </div>

        </div >
    )
}

export default HeroSection