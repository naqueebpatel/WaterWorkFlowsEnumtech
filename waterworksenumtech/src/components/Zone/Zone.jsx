import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import '../../styles/zone.css';
function Zone({ setCollapsed }) {
  const [ data, setData ] = useState([]);
  const [ zone, setZone ] = useState({
    zonename: "",
  });
  const [ loading, setLoading ] = useState(false);


  const getData = async () => {
    try {
      let res = await axios.get("http://localhost:8090/waterwork/get/getZone");
      setData([ ...res.data ]);
      console.log(res);
    } catch (error) {
      alert("Error");
    }
  };

  const handleChange = (e) => {
    setZone({ ...zone, [ e.target.name ]: e.target.value });
  };

  useEffect(() => {
    getData();
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






  const handleRefresh = () => {
    getData();
  };

  return (
    <>
      <div>
        <Form onSubmit={postZone}>

          <div className="datatable-container" style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", position: "relative", left: "16vw",
            top: "8vh",
            margin: 0,
          }}>
            <div className="header-tools">
              <div className="search">
                <input type="search" className="search-input" placeholder="Search..."
                  name="zonename"
                  value={zone.zonename}
                  onChange={handleChange} />
              </div>
              <Button variant="primary" type="submit" disabled={loading} onClick={handleRefresh}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>

            <table className="datatable">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Zone No.</th>
                  <th>Zone Name</th>
                </tr>
              </thead>

              <tbody>
                {data && data.map((item) => (
                  <tr key={item.zoneno} className="table-info">
                    <td>
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt={`Avatar`}
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                    </td>
                    <td >{item.zoneno}</td>
                    <td >{item.zonename}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </Form>
      </div>
      {/* <Table /> */}
    </>
  );
}

export default Zone;
