import axios from "axios";
import "./App.css"
import { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      let res = await axios.get("http://localhost:8090/waterwork/get/getZone");
      setData([...res.data]);
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


  const tableStyle = {
    border: "1px solid #000",
    borderCollapse: "collapse",
    width: "30%",
  };


  const cellStyle = {
    border: "1px solid #000",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <div className="App">
      
      <table style={tableStyle}>
      <button className="App" onClick={handleRefresh}>Refresh</button>
        <thead>
          <tr>
            <th style={cellStyle} scope="col">Zone No</th>
            <th style={cellStyle} scope="col">Zone Name</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.zoneid}>
                <td style={cellStyle}>{item.zoneno}</td>
                <td style={cellStyle}>{item.zonename}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
