import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { MDBValidationItem } from 'mdb-react-ui-kit';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';



function ThirdPartyModal(props) {
    const [ data, setData ] = useState({
        firstName: "",
        lastName: "",
        number: "",
        profession: "",
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(event);
        // console.log(event.target);
        // console.log(event.target.name);
        // console.log(event.target.value);
        setData({
            ...data,
            [ name ]: value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
    };
    return (
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
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                value={data.firstName}
                                name="firstName"
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                value={data.lastName}
                                name="lastName"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Number"
                                value={data.number}
                                name="number"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <MDBValidationItem className="col-md-4 mt-4">
                            <select className="form-select" aria-label="Default select example" name="profession" value={data.profession} onChange={handleChange}>
                                <option value="" disabled>Select Profession</option>
                                <option value="plumber">Plumber</option>
                                <option value="electrician">Electrician</option>
                            </select>
                        </MDBValidationItem>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button type="submit" onClick={handleSubmit}>Submit form</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}

export default ThirdPartyModal;