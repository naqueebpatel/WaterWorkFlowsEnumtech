// import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
// import '../styles/navbar.css';
// import Profile from '../logo/avatar.avif';
// import logo from '../logo/accounting-3d-icon-illustration-png.png';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { SidebarData } from './SlidebarData';
// import { IconContext } from 'react-icons';
// const Navbar = () => {
//     const [ sidebar, setSidebar ] = useState(false);

//     const showSidebar = () => setSidebar(!sidebar);
//     return (
//         <>
//             <IconContext.Provider value={{ color: '#000000' }}>
//                 <header>
//                     <nav className="navbar">
//                         <div className="top">
//                             <div className="left">
//                                 <div className="navigation">
//                                     <Link to='#' className='menu-bars'>
//                                         <RxHamburgerMenu onClick={showSidebar} size={35} />
//                                     </Link>
//                                 </div>
//                                 <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//                                     <ul className='nav-menu-items' onClick={showSidebar}>
//                                         <li className='navbar-toggle'>
//                                             <Link to='#' className='menu-bars'>
//                                                 <RxCross1 />
//                                             </Link>
//                                         </li>
//                                         {SidebarData.map((item, index) => {
//                                             return (
//                                                 <li key={index} className={item.cName}>
//                                                     <Link to={item.path}>
//                                                         {item.icon}
//                                                         <span>{item.title}</span>
//                                                     </Link>
//                                                 </li>
//                                             );
//                                         })}
//                                     </ul>
//                                 </div>
//                                 <div className="logo">
//                                     <h3>Water Works</h3>
//                                 </div>
//                             </div>
//                             <div className="right">
//                                 <div className="links topBotomBordersOut">
//                                     <a href='/#home'>Home</a>
//                                     <a href='/#about'>About Us</a>
//                                     <a href='/#contact'>Contact Us</a>
//                                 </div>
//                                 <div className="profilephoto">
//                                     <img src={Profile} alt="Profile_Photo" />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bottom">
//                             <div className="bottom-left">
//                                 <p>
//                                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eius, deleniti illo possimus nulla, amet iure eos aliquid, laboriosam inventore consequuntur rerum laborum quasi.
//                                 </p>
//                                 <button className='btn btn-primary'>Login In</button>
//                             </div>
//                             <div className="bottom-right">
//                                 <img src={logo} alt="Account" />
//                             </div>
//                         </div>
//                     </nav>
//                 </header>
//             </IconContext.Provider>
//         </>
//     );
// };

// export default Navbar;



import React from 'react';
import logo from '../logo/2560px-Bisleri_logo.svg.png';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <header>
            <img src={logo} alt="logo" className='logo' />
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