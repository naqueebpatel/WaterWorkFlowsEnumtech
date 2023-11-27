import React, { useEffect } from 'react';
import {
    MDBBadge,
    MDBContainer,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";
import product from '../Images/Product.jpg';


const Product = ({ setCollapsed }) => {
    useEffect(() => {
        setCollapsed(true);
    }, []);

    


    return (
        <>
            <MDBContainer style={{ width: "75%", position: "relative", top: "40px", left: "40px" }}>
                <h1>View :-</h1>
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
            </MDBContainer >
        </>
    );
};

export default Product;