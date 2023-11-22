import React from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import '../styles/siderbar.css';
import Logo from './sidebarcomponents/Logo';
import MenuList from './sidebarcomponents/MenuList';
const { Header, Sider } = Layout;
const SideBar = ({ collapsed, toggle }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ position: "absolute", zIndex: "1" }}>
            <Sider collapsed={collapsed}
                collapsible
                trigger={null}
                className='sidebar'>
                <Logo />
                <MenuList />
            </Sider>
            <Layout>
                {collapsed && <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button className='toggle' onClick={toggle} type='text' icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: "2rem", color: "white" }} /> : <MenuFoldOutlined style={{ fontSize: "2rem", color: "white" }} />} />
                </Header>}
            </Layout>
        </Layout>
    );
};

export default SideBar;