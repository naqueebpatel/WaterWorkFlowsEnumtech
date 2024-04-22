import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SubnodeOutlined } from '@ant-design/icons';
import { IoIosPeople } from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";
import { SiVectorlogozone } from "react-icons/si";
import { TbPhysotherapist } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { GiCash } from "react-icons/gi";
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
            <Menu.SubMenu
                key="utility"
                icon={<FaUserAlt />}
                title="Utility"
            >
                <Menu.Item key="outward"><Link to="/outwardSource">OutWard</Link></Menu.Item>
                <Menu.Item key="inward"><Link to="/inwardSource">Inward</Link></Menu.Item>
                <Menu.Item key="product"><Link to="/productSource">Product</Link></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
                key="transaction"
                icon={<FaUserAlt />}
                title="Transaction"
            >
                <Menu.SubMenu key="transaction_inward" title="Inward">
                    <Menu.Item key="transaction_inward_insert"><Link to="/inwardTrans">Insert</Link></Menu.Item>
                    <Menu.Item key="transaction_inward_view"><Link to="/inwardwardTransview">View</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="transaction_outward" title="Outward">
                    <Menu.Item key="transaction_outward_insert"><Link to="/outwardTrans">Insert</Link></Menu.Item>
                    <Menu.Item key="transaction_outward_view"><Link to="/outwardwardTransview">View</Link></Menu.Item>
                </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.Item key="topup" icon={<GiCash />} >
                <Link to="/topup">Topup</Link>
            </Menu.Item>
            <Menu.SubMenu
                key="reports"
                icon={<TbReportSearch />}
                title="Reports"
            >
                <Menu.Item key="reports-insert"><Link to="/subscriberreports">Transaction</Link></Menu.Item>
                <Menu.Item key="inward-insert"><Link to="/inwardsreports">Income</Link></Menu.Item>
                <Menu.Item key="expense-insert"><Link to="/exportsreports">Expense</Link></Menu.Item>
            </Menu.SubMenu>
            <Menu.Item
                key="third-party"
                icon={<TbPhysotherapist />}
            >
                <Link to="/3rdpartydetails">Third Party</Link>
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;