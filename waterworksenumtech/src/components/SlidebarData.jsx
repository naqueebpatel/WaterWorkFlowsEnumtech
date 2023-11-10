
import * as AiIcons from 'react-icons/ai';
import { MdDashboard, MdDeleteForever, MdUpdate } from 'react-icons/md';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'DashBoard',
        path: '/dashboard',
        icon: <MdDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Insert',
        path: '/insert',
        icon: <AiIcons.AiFillPlusCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Delete',
        path: '/delete',
        icon: <MdDeleteForever />,
        cName: 'nav-text'
    },
    {
        title: 'Update',
        path: '/update',
        icon: <MdUpdate />,
        cName: 'nav-text'
    },
];



export const Data = [
    {
        zonename: "Faizan",
    },
    {
        zonename: "Farhan",
    },
    {
        zonename: "Zaid",
    },
    {
        zonename: "Farhan",
    },
    {
        zonename: "Shahid",
    }
];