import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { createBrowserHistory } from 'history';
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
                    <Link to="/" className="navbar-name" onClick={closeMobileMenu}>GhuraGhuri</Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                        {localStorage.getItem("currentID") === '' ?
                                (<Link to='/login' className='nav-links' onClick={closeMobileMenu}>Plan</Link>) :
                                (<Link to='/myplans' className='nav-links' onClick={closeMobileMenu}>Plan</Link>)}
                        </li>
                        <li className='nav-item'>
                            <Link to='/discover' className='nav-links' onClick={closeMobileMenu}>Discover</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/aboutus' className='nav-links' onClick={closeMobileMenu}>About Us</Link>
                        </li>
                        <li className='nav-item'>
                        {localStorage.getItem("currentID") === '' ?
                                (<Link to='/login' className='nav-links' onClick={closeMobileMenu}>Home</Link>) :
                                (<Link to='/home' className='nav-links' onClick={closeMobileMenu}>Home</Link>)}
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