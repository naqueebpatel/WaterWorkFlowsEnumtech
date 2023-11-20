import React from 'react';
import '../styles/submenu.css';
import { Link } from 'react-router-dom';
const SubMenu = () => {
    const colors = {
        color: "black",
    };
    return (
        <>
            <nav>
                <ul className='sub-toggle'>
                    <li><Link to='/zone' style={colors} >Zone</Link></li>
                    <li>Subscriber
                        <ul className='drop-down sub-toggle'>
                            <li><Link to='/subscriberadd' style={colors} >Insert</Link></li>
                            <li><Link to='/subscriberView' style={colors} >View</Link></li>
                        </ul>
                    </li>
                    <li>Employee
                        <ul className='employee_drop-down sub-toggle'>
                            <li><Link to='/employeeAdd' style={colors} >Insert</Link></li>
                            <li><Link to='/employeeView' style={colors} >View</Link></li>
                        </ul>
                    </li>
                    <li><Link to='/3rdpartydetails'>3rd Party Details</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default SubMenu;