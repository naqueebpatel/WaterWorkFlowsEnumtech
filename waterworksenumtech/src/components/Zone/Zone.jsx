import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "./Table";
import Swal from 'sweetalert2';

function Zone({ setCollapsed }) {
  const [ zone, setZone ] = useState({
    zonename: "",
  });
  const [ loading, setLoading ] = useState(false);

  const handleChange = (e) => {
    setZone({ ...zone, [ e.target.name ]: e.target.value });
  };

  useEffect(() => {
    setCollapsed(true);
  }, []);

  const postZone = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      console.log(zone);

      const response = await axios.post("http://localhost:8090/waterwork/add/addZone", null, {
        params: zone,
      });

      setZone({ zonename: "" });
      console.log("Response data:", response.data);

      // Optionally, show success message using SweetAlert
      Swal.fire('Success', 'Zone added successfully', 'success');
    } catch (error) {
      console.error("Error:", error.message);

      // Show an error message using SweetAlert
      Swal.fire('Error', 'Failed to add zone', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container w-25">
        <Form onSubmit={postZone}>
          <Form.Group className="mb-3">
            <Form.Label>
              <h2>Zone Name</h2>
            </Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Zone Name"
              name="zonename"
              value={zone.zonename}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </div>
      <Table />
    </>
  );
}

export default Zone;
