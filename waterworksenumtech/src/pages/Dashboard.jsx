import { FcSalesPerformance } from 'react-icons/fc';
import { FaPeopleArrows } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Data, PieData } from '../components/SlidebarData';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import '../styles/dashboard.css';
const COLORS = [ "#0088FE", "#00C49F", "#FFBB28", "#FF8042" ];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const Dashboard = () => {
    return (
        <>
            <main className="main-container">
                <div className="main-title">
                    <h3>Dashboard</h3>
                </div>

                <div className="main-cards">
                    <div className="card">
                        <div className="card-inner">
                            <h3>Total Sales</h3>
                            <FcSalesPerformance className='card_icon' />
                        </div>
                        <h1>$ 300</h1>
                    </div>
                    <div className="card">
                        <div className="card-inner">
                            <h3>Total Employees</h3>
                            <FaPeopleArrows className='card_icon' />
                        </div>
                        <h1>12</h1>
                    </div>
                    <div className="card">
                        <div className="card-inner">
                            <h3>Total Subscriber</h3>
                            <IoIosPeople className='card_icon' />
                        </div>
                        <h1>50</h1>
                    </div>
                </div>
                <div className="charts">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={600}
                            height={300}
                            data={Data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={PieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={130}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {PieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[ index % COLORS.length ]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </main>
        </>
    );
};
export default Dashboard;