import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
    MDBBadge,
    MDBContainer,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
} from "mdb-react-ui-kit";
import Inward from '../Images/Inward.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function InwardSources(props) {

    const[inwardData,setInwardData]=useState([]);
    const[loading,setLoading]=useState(false)

    useEffect(() => {
        fetchInwardData();
      }, []);
    
      const fetchInwardData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            "http://localhost:8090/waterwork/get/getAllInwardSource"
          );
          setInwardData(response.data); // Assuming data is an array of objects with zonename and zoneno attributes
        } catch (error) {
          console.error("Error fetching zone data:", error);
        } finally {
          setLoading(false);
        }
      };

    const [inward,setInward]=useState({
        inwardSname:""
    })

    const handleChange=(event)=>{
        const {name,value}=event.target
        console.log(inward)
        setInward({
            ...inward,
            [name]:value
        })
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        console.log(inward)

    axios
    .post(`http://localhost:8090/waterwork/add/addInwardSource`, inward)
    .then((response) => {
      console.log("Response data:", response.data);
      props.onHide()
      if (response.status === 200) {
        Swal.fire('Success', 'Record updated successfully', 'success');
        fetchInwardData()
      } else {
        Swal.fire('Error', 'Failed to update record', 'error');
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
      Swal.fire('Error','Failed to update record','error')
    });
    }

    return (
        <>
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Inward Source
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Inward name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Inward Name"
                                    name="inwardSname"
                                    inward={inward.inwardSname}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                        <MDBBtn onClick={handleSubmit}>PAY</MDBBtn>
                    </Modal.Footer>
                </Modal>
            <MDBContainer className="my-5 mt-4">
                <MDBTable align="middle" className="table-bordered">
                    <MDBTableHead>
                        <tr className="table-success">
                            <th scope="col" className='text-center'>Profile</th>
                            <th scope="col" className='text-center' >ID Number</th>
                            <th scope="col" className='text-center' >Product Name</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            inwardData.map((inward, index) => {
                                return (
                                    <tr className="table-info">
                                        <td className='text-center'>
                                            <img
                                                src={Inward}
                                                alt={`Avatar`}
                                                style={{ width: "55px", height: "55px" }}
                                                className="rounded-circle "
                                            />
                                        </td>
                                        <td>
                                            <p className="fw-bold mb-1 text-center fs-4">{inward.inwardSid}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 fw-bold fs-5 text-center">
                                                <MDBBadge
                                                    color={
                                                        inward.id % 2 === 0 ? "success" : "primary"
                                                    }
                                                    pill

                                                >
                                                    {
                                                        inward.name % 2 === 0 ? inward.inwardSname : inward.inwardSname
                                                    }
                                                </MDBBadge>
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
}

export default InwardSources;