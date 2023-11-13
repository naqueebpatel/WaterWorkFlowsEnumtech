import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { SidebarData } from './SlidebarData';
import { useState } from 'react';
import SubMenu from './SubMenu';
const NavigationBar = () => {
    const [ sidebar, setSidebar ] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
            <div className="navigation">
                <Link to='#' className='menu-bars'>
                    <RxHamburgerMenu onClick={showSidebar} size={35} color='black' />
                </Link>
                <SubMenu />
            </div>
            <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <RxCross1 color='black' />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default NavigationBar;