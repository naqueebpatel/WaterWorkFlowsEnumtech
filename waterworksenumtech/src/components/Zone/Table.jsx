import axios from "axios";
import { useEffect, useState } from "react";
import { LuRefreshCcw } from 'react-icons/lu';
import '../../styles/zone.css';

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
      <table className="zone-table">
        <thead>
          <tr>
            <th scope="col">Zone No</th>
            <th scope="col">Zone Name</th>
            <span onClick={handleRefresh}><LuRefreshCcw /></span>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.zoneno}>
                <td >{item.zoneno}</td>
                <td >{item.zonename}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
