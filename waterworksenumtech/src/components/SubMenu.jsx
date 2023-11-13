import React from 'react';
import '../styles/submenu.css';
import { Link } from 'react-router-dom';
const SubMenu = () => {
    return (
        <>
            <nav>
                <ul className='sub-toggle'>
                    <li><Link to='/zone'>Zone</Link></li>
                    <li>Subscriber
                        <ul className='drop-down sub-toggle'>
                            <li><Link to='/subscriberadd'>Insert</Link></li>
                            <li><Link to='/subscriberView'>View</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default SubMenu;