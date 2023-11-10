// import axios from "axios";
// import { useState } from "react";
// import Table from "./Table";

// export default function Zone() {
//   const [ zone, setZone ] = useState({
//     zonename: "",
//   });

//   const handleChange = (e) => {
//     setZone({ ...zone, [ e.target.name ]: e.target.value });
//   };

//   const postZone = (event) => {
//     event.preventDefault();
//     console.log(zone);
//     axios
//       .post("http://localhost:8090/waterwork/add/addZone", null, {
//         params: zone,
//       })
//       .then((response) => {
//         setZone({ zonename: "" });
//         console.log("Response data:", response.data);

//       })
//       .catch((error) => {
//         console.error("Error:", error.message);
//       });
//   };

//   return (
//     <div className="App">
//       ADD ZONE
//       <form onSubmit={postZone}>
//         <input
//           type="text"
//           name="zonename"
//           value={zone.zonename}
//           onChange={handleChange}
//         />
//         <br />
//         <button>Submit</button>
//       </form>
//       <Table />
//     </div>
//   );
// }



import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from './Table';

function Zone() {
  return (
    <>
      <div className="container w-25">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h2>Zone Name</h2></Form.Label>
            <Form.Control type="email" placeholder="Enter Zone Name" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <Table />
    </>
  );
}

export default Zone;
