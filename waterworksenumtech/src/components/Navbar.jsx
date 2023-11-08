import { RxHamburgerMenu } from 'react-icons/rx';
import '../styles/navbar.css';
import Profile from '../logo/facebook-blank-face-blank.jpeg';
import logo from '../logo/accounting-3d-icon-illustration-png.png';
const Navbar = () => {
    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="top">
                        <div className="left">
                            <div className="navigation">
                                <RxHamburgerMenu size={35} />
                            </div>
                            <div className="logo">
                                <h3>Water Works</h3>
                            </div>
                        </div>
                        <div className="right">
                            <div className="links topBotomBordersOut">
                                <a href='/#home'>Home</a>
                                <a href='/#about'>About Us</a>
                                <a href='/#contact'>Contact Us</a>
                            </div>
                            <div className="profilephoto">
                                <img src={Profile} alt="ProfilePhoto" />
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="bottom-left">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eius, deleniti illo possimus nulla, amet iure eos aliquid, laboriosam inventore consequuntur rerum laborum quasi.
                            </p>
                            <button>Login In</button>
                        </div>
                        <div className="bottom-right">
                            <img src={logo} alt="Account" />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;