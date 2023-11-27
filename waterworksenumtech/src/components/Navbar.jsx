import React from 'react';
import logo from '../logo/2560px-Bisleri_logo.svg.png';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <header>
            <img src={logo} alt="logo" />
            <nav>
                <ul className='nav_links'>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#contact">Contact Us</a>
                    </li>
                    <li>
                        <a href="#about">About Us</a>
                    </li>
                </ul>
            </nav>
            <a href="#">
                <button className='btn btn-primary'>
                    Login in
                </button>
            </a>
        </header>
    );
};

export default Navbar;