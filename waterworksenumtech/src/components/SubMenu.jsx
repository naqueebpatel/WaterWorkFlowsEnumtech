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
                            <li>Insert</li>
                            <li>View</li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default SubMenu;