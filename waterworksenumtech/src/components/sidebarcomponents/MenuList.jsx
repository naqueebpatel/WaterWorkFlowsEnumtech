import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SubnodeOutlined } from '@ant-design/icons';
import { IoIosPeople } from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";
import { SiVectorlogozone } from "react-icons/si";
import { TbPhysotherapist } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
const MenuList = () => {
    return (
        <Menu theme='dark' mode='inline' className='menu-bar' >
            <Menu.Item key="home" icon={<HomeOutlined />} >
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="dashboard" icon={<BiSolidDashboard />} >
                <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="zone" icon={<SiVectorlogozone />} >
                <Link to="/zone">Zone</Link>
            </Menu.Item>
            <Menu.SubMenu
                key="subscriber"
                icon={<SubnodeOutlined />}
                title="Subscriber"
            >
                <Menu.Item key="subscriber-insert"><Link to="/subscriberadd">Insert</Link></Menu.Item>
                <Menu.Item key="subscriber-view"><Link to="/subscriberView">View</Link></Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu
                key="employee"
                icon={<IoIosPeople />}
                title="Employee"
            >
                <Menu.Item key="employee-insert"><Link to="/employeeadd">Insert</Link></Menu.Item>
                <Menu.Item key="employee-view"><Link to="/employeeView">View</Link></Menu.Item>
            </Menu.SubMenu>
            <Menu.Item
                key="third-party"
                icon={<TbPhysotherapist />}
            >
                <Link to="/3rdpartydetails">Third Party</Link>
            </Menu.Item>
            <Menu.SubMenu
                key="utility"
                icon={<FaUserAlt />}
                title="Utility"
            >
                <Menu.Item key="outward"><Link to="/outward">OutWard</Link></Menu.Item>
                <Menu.Item key="inward"><Link to="/inward">Inward</Link></Menu.Item>
                <Menu.Item key="product"><Link to="/product">Product</Link></Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default MenuList;