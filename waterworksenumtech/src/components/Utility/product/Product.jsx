import React, { useEffect } from 'react';
import product from '../Images/Product.jpg';


const data = [
    { id: 1, name: "Filter Water", quantity: 1 },
    { id: 2, name: "Bottle Cap", quantity: 3 },
    { id: 3, name: "Water Bottle", quantity: 2 },
    { id: 4, name: "Charity", quantity: 5 },
];


const Product = ({ setCollapsed }) => {
    useEffect(() => {
        setCollapsed(true);
    }, []);
    return (
        <>
            {/* <MDBContainer style={{
                position: "relative",
                left: "6vw",
                width: "60dvw"
            }}>
                <h1 className='text-white'>View :-</h1>
                <MDBTable align="middle" className="table-bordered">
                    <MDBTableHead>
                        <tr className="table-success">
                            <th scope="col" className='text-center'>Profile</th>
                            <th scope="col" className='text-center' >ID Number</th>
                            <th scope="col" className='text-center' >Product Name</th>
                            <th scope='col' className='text-center'>Quantity</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            data.map((value, index) => {
                                return (
                                    <tr className="table-info">
                                        <td className='text-center'>
                                            <img
                                                src={product}
                                                alt={`Avatar`}
                                                style={{ width: "55px", height: "55px" }}
                                                className="rounded-circle "
                                            />
                                        </td>
                                        <td>
                                            <p className="fw-bold mb-1 text-center fs-4">{value.id}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 fw-bold fs-5 text-center">
                                                <MDBBadge
                                                    color={
                                                        value.id % 2 === 0 ? "success" : "primary"
                                                    }
                                                    pill

                                                >
                                                    {
                                                        value.name % 2 === 0 ? value.name : value.name
                                                    }
                                                </MDBBadge>
                                            </p>
                                        </td>
                                        <td>
                                            <p className="fw-bold text-center fs-4">
                                                {value.quantity}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </MDBTableBody>
                </MDBTable>
            </MDBContainer > */}
            <div>
                <form>

                    <div className="datatable-container">

                        <table className="datatable">
                            <thead>
                                <tr>
                                    <th>Profile</th>
                                    <th>Id Number</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img
                                                    src={product}
                                                    alt={`Avatar`}
                                                    style={{ width: "55px", height: "55px" }}
                                                    className="rounded-circle "
                                                />
                                            </td>
                                            <td className="fw-bold fs-4">{value.id}</td>
                                            <td className="fw-bold fs-4">{value.name}</td>
                                            <td className="fw-bold fs-4"> {value.quantity}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Product;