import React, { useState } from 'react';
import logo from '../logo/2560px-Bisleri_logo.svg.png';
import '../styles/navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineClose } from 'react-icons/md';
import { FaBars } from "react-icons/fa6";

const links = [
    {
        name: "Home",
        path: '/'
    },
    {
        name: "About Us",
        path: '#about'
    },
    {
        name: "Bill",
        path: '/bill'
    },
    {
        name: "Blog",
        path: '#blog'
    },
    {
        name: "Contact US",
        path: '#contact'
    }
];

const Navbar = () =>
{
    const [ isNavShowing, setIsNavShowing ] = useState( false );
    return (
        <header className='header'>
            <img src={ logo } alt="logo" />
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
                    <li>
                        <a href="#blog">Blog</a>
                    </li>
                    <li>
                        <Link to="/bill">Bill</Link>
                    </li>
                </ul>
            </nav>
            <div className="nav__links">
                <ul
                    className={ `nav__links ${ isNavShowing ? "show__nav" : "hide__nav"
                        }` }>
                    { links.map( ( { name, path }, index ) =>
                    {
                        return (
                            <li key={ index }>
                                <NavLink
                                    to={ path }
                                    className={ ( { isActive } ) => ( isActive ? "active-nav" : "" ) }
                                    onClick={ () => setIsNavShowing( ( prev ) => !prev ) }>
                                    { name }
                                </NavLink>
                            </li>
                        );
                    } ) }
                </ul>
            </div>
            <a href="#">
                <button className='btn btn-primary'>
                    Login in
                </button>
            </a>
            <button
                className="nav__toggle-btn"
                onClick={ () => setIsNavShowing( ( prev ) => !prev ) }>
                { isNavShowing ? <MdOutlineClose /> : <FaBars /> }
            </button>
        </header>
    );
};

export default Navbar;