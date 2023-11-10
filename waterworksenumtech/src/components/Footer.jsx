import image from '../logo/images.jpeg';
import '../styles/footer.css';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { TiLocation } from 'react-icons/ti';
import { BsFacebook } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai';
const Footer = () => {
    return (
        <div>
            <footer className='footer'>
                <div className='footer-left'>
                    <img src={image} alt='' />
                    <ul className="socialItems">
                        <a href='#'><AiFillTwitterCircle /></a>
                        <a href='#'><BsFacebook /></a>
                        <a href='#'><BsInstagram /></a>
                        <a href='#'><AiFillLinkedin /></a>

                    </ul>
                </div>

                <ul className='footer-right'>
                    <li>
                        <h2>Quick link</h2>
                        <ul class="box">
                            <li><a href='#'>Home</a></li>
                            <li><a href='#'>About Us</a></li>
                            <li><a href='#'>Contact</a></li>
                        </ul>
                    </li>
                    <li className='features'>
                        <h2>More</h2>
                        <ul class="box">
                            <li><a href='#'>FAQ's</a></li>
                            <li><a href='#'>Privasy & Policy</a></li>
                            <li><a href='#'>terms & Condition</a></li>
                        </ul>
                    </li>
                    <li>
                        <h2 class>Contact</h2>
                        <ul class="box">
                            <li><a href='#'><AiOutlineMail color='blue' size="30" /><span>www.enumtech.in</span></a></li>
                            <li><a href='#'><BsFillTelephoneFill color='blue' size="25" /><span>+91 8237307229</span></a></li>
                            <li><a href='#'><TiLocation color='blue' size="25" /><span>104, West Wing Arora Towers MG Road Pune-411001,
                                Maharashtra,India</span></a></li>
                        </ul>
                    </li>
                </ul>
            </footer >
        </div >
    );
};

export default Footer;