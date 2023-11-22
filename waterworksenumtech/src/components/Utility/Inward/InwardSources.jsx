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
} from "mdb-react-ui-kit";
import inward from '../Images/Inward.jpg';

const data = [
    { id: 1, name: "Filter Water" },
    { id: 2, name: "Bottle Cap" },
    { id: 3, name: "Water Bottle" },
    { id: 4, name: "Charity" },
];

function InwardSources(props) {

    return (
        <>
            <Form>
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Details
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
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                        <Button type="submit">Submit form</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
            <MDBContainer style={{ width: "75%", position: "relative", top: "40px", left: "40px" }}>
                <h1>Inward</h1>
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
                            data.map((value, index) => {
                                return (
                                    <tr className="table-info">
                                        <td className='text-center'>
                                            <img
                                                src={inward}
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