import React, { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import Button from 'react-bootstrap/Button';
const SubscriberReports = (props) => {
    const [ subscriber, setsubscriber ] = useState([]);
    const [ modalShow, setModalShow ] = useState(false);
    const [ singlesubscriber, setSinglesubscriber ] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8090/waterwork/get/getAllSubscriber');
            const result = await response.json();
            console.log(result);
            setsubscriber(result);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSingleUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8090/waterwork/get/getBySubsNo?subscriberNo=${id}`);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowBillModal = ({subscriberNo,firstName,lastName}) => {
        fetchSingleUser(subscriberNo).then((res)=>{
          setSinglesubscriber([{subscriberNo,firstName,lastName},...res]);    
        }).catch(err=>console.log(err))
        setModalShow(true);
    };
    console.log(singlesubscriber)


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
                                    <th>Subscriber No</th>
                                    <th>Name</th>
                                    <th>Aadhar No</th>
                                    <th>Mobile Number</th>
                                    <th>Download Bill</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriber.map((subscriber) => (
                                    <tr key={subscriber.subscriberNo} className="table-info">
                                        <td>
                                            <img
                                                src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                                alt={`Avatar`}
                                                style={{ width: "45px", height: "45px" }}
                                                className="rounded-circle"
                                            />
                                        </td>
                                        <td>{subscriber.subscriberNo}</td>
                                        <td>
                                            <p className="fw-bold mb-1">{subscriber.firstName} {subscriber.lastName}</p>
                                        </td>
                                        <td>{subscriber.subscriberAdharNo}</td>
                                        <td>{subscriber.subscriberMobileNo}</td>
                                        <td>
                                            {/* <FaDownload className='h3 ms-3' onClick={() => handleDownload(subscriber.id)} /> */}



                                            <Button variant="primary" onClick={() => handleShowBillModal(subscriber)}>
                                                Show Bill
                                            </Button>

                                            <MyVerticallyCenteredModal
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                                singlesubscriber={singlesubscriber}
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