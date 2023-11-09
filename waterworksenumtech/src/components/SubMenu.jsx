import React from 'react';
import '../styles/submenu.css';
const SubMenu = () => {
    return (
        <>
            <ul className='sub-toggle'>
                <li>Zone</li>
                <div className='sub-menu'>
                    <ul>
                        <li>Insert</li>
                        <li>Update</li>
                    </ul>
                </div>
            </ul>
        </>
    );
};

export default SubMenu;