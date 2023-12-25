
import {
    MDBBadge,
    MDBContainer,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";
import { useEffect, useState } from 'react';
import axios from 'axios';



function Product(props) {

    const[productData,setProductData]=useState([]);
    const[loading,setLoading]=useState(false)

    useEffect(() => {
        fetchProductId();
      }, []);
    
      const fetchProductId = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            "http://localhost:8090/waterwork/get/getAllProduct"
          );
          setProductData(response.data); // Assuming data is an array of objects with zonename and zoneno attributes
          console.log(response)
        } catch (error) {
          console.error("Error fetching product data:", error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <>
            <MDBContainer className="my-5 mt-4">
                <MDBTable align="middle" className="table-bordered">
                    <MDBTableHead>
                        <tr className="table-success">
                            <th scope="col" className='text-center'>Profile</th>
                            <th scope="col" className='text-center' >ID Number</th>
                            <th scope="col" className='text-center' >Product Name</th>
                            <th scope="col" className='text-center' >Quantity</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            productData.map((prod, index) => {
                                return (
                                    <tr key={prod.productId} className="table-info">
                                        <td className='text-center'>
                                            <img
                                                src=""
                                                alt={`Avatar`}
                                                style={{ width: "55px", height: "55px" }}
                                                className="rounded-circle "
                                            />
                                        </td>
                                        <td>
                                            <p className="fw-bold mb-1 text-center fs-3">{prod.productId}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 fw-bold fs-5 text-center">
                                                <MDBBadge
                                                    color={
                                                        prod.productId % 2 === 0 ? "success" : "primary"
                                                    }
                                                    pill

                                                >
                                                    {
                                                        prod.productId % 2 === 0 ? prod.productName : prod.productName
                                                    }
                                                </MDBBadge>
                                            </p>
                                        </td>
                                        <td className="fw-bold mb-1 text-center fs-4">{prod.productQty}</td>
                                    </tr>
                                );
                            })
                        }
                    </MDBTableBody>
                </MDBTable>
            </MDBContainer >
        </>
    );
}

export default Product;