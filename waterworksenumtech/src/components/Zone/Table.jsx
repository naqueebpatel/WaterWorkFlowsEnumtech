import axios from "axios";
import { useEffect, useState } from "react";
import { LuRefreshCcw } from 'react-icons/lu';
import '../../styles/zone.css';
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

const Table = () => {
  const [ data, setData ] = useState([]);

  const getData = async () => {
    try {
      let res = await axios.get("http://localhost:8090/waterwork/get/getZone");
      setData([ ...res.data ]);
      console.log(res);
    } catch (error) {
      alert("Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRefresh = () => {
    getData();
  };



  return (
    <>
      <MDBContainer className="my-5 mt-4" style={{ position: "relative", left: "4%", width: "75%" }}>
        <MDBTable align="middle" className="table-bordered">
          <MDBTableHead>
            <tr className="table-success">
              <th scope="col">Zone No.</th>
              <th scope="col">Zone Name</th>
              <th scope="col" onClick={handleRefresh}><LuRefreshCcw /></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {/* Example employee data with added image property */}
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
                <td>
                  <td >{item.zoneno}</td>
                  <td >{item.zonename}</td>
                </td>
              </tr>
            ))}


          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    </>
  );
};

export default Table;



