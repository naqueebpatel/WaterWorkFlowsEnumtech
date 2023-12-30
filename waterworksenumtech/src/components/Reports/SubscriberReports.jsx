import React, { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import Button from 'react-bootstrap/Button';
const SubscriberReports = (props) => {
    const [ employee, setEmployee ] = useState([]);
    const [ modalShow, setModalShow ] = useState(false);
    const [ singleEmployee, setSingleEmployee ] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const result = await response.json();
            console.log(result);
            setEmployee(result);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSingleUser = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const result = await response.json();
            console.log(result);
            setSingleEmployee(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowBillModal = (id) => {
        fetchSingleUser(id);
        setModalShow(true);
    };


    useEffect(() => {
        props.setCollapsed(true);
        fetchData();
    }, []);
    return (
        <div>
            <div>
                <form>
                    <div className="datatable-container">
                        <div className="header-tools">
                            <div className="search">
                                <input type="search" className="search-input" placeholder="Search..." />
                            </div>
                        </div>
                        <table className="datatable">
                            <thead>
                                <tr>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Mobile Number</th>
                                    <th>Download Bill</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employee.map((employee) => (
                                    <tr key={employee.id} className="table-info">
                                        <td>
                                            <img
                                                src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                                alt={`Avatar`}
                                                style={{ width: "45px", height: "45px" }}
                                                className="rounded-circle"
                                            />
                                        </td>
                                        <td>
                                            <p className="fw-bold mb-1">{employee.name}</p>
                                        </td>
                                        <td>
                                            <p>{employee.address.street}</p>
                                        </td>
                                        <td>{employee.phone}</td>
                                        <td>
                                            {/* <FaDownload className='h3 ms-3' onClick={() => handleDownload(employee.id)} /> */}



                                            <Button variant="primary" onClick={() => handleShowBillModal(employee.id)}>
                                                Show Bill
                                            </Button>

                                            <MyVerticallyCenteredModal
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                                singleEmployee={singleEmployee}
                                            />


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default SubscriberReports;