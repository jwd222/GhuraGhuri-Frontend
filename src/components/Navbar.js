import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { createBrowserHistory } from 'history';
import { NavLink } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    const history = createBrowserHistory({forceRefresh:true});
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 900) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton();

    }, []);
    window.addEventListener('resize', showButton);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <a href="/" className="navbar-name" onClick={closeMobileMenu}>GhuraGhuri</a>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                        {localStorage.getItem("currentID") === '' ?
                                (<a href='/login' className='nav-links' onClick={closeMobileMenu}>Plan</a>) :
                                (<a href='/myplans' className='nav-links' onClick={closeMobileMenu}>Plan</a>)}
                        </li>
                        <li className='nav-item'>
                            <a href='/discover' className='nav-links' onClick={closeMobileMenu}>Discover</a>
                        </li>
                        <li className='nav-item'>
                            <a href='/aboutus' className='nav-links' onClick={closeMobileMenu}>About Us</a>
                        </li>
                        <li className='nav-item'>
                        {localStorage.getItem("currentID") === '' ?
                                (<a href='/login' className='nav-links' onClick={closeMobileMenu}>Home</a>) :
                                (<a href='/home' className='nav-links' onClick={closeMobileMenu}>Home</a>)}
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline'
                        buttonSize='btn--medium'>Log In</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar