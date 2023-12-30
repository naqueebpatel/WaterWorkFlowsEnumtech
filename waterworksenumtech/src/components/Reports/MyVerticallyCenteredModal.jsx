import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import signature from './signature.png';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function MyVerticallyCenteredModal(props) {
  const handleDownload = async () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.addImage('https://png.pngtree.com/png-clipart/20220125/ourmid/pngtree-liquid-water-drop-splash-three-dimensional-decoration-png-image_4361854.png', 'PNG', 80, 0, 150, 50);
    doc.setFont('Source Code Pro', "", "400");
    doc.setFontSize(50);
    doc.text("Invoice", 150, 60, { align: "center" });
    doc.autoTable({
      margin: { top: 70, left: 20 },
      html: '#employee-table',
    });
    doc.setFontSize(20);
    doc.text("Authorized Signature", 50, 150);
    doc.addImage(signature, 50, 160, 50, 50);
    doc.save(`${props?.singleEmployee?.name}`);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props?.singleEmployee?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover id='employee-table' >
          <thead>
            <tr >
              <td>Customer No.101</td>
              <td colSpan={4}>Subscriber name :{props?.singleEmployee?.name}</td>
              <td>Opening Bal : 5000</td>
            </tr>
            <tr>
              <th>Date</th>
              <th>Particular</th>
              <th style={{ whiteSpace: "nowrap" }}>Receipt No.</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>{props?.singleEmployee?.address?.zipcode}</td>
              <td>{props?.singleEmployee?.address?.suite}</td>
              <td>{" "}</td>
              <td>100</td>
              <td>{" "}</td>
              <td>4900</td>
            </tr>
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>{props?.singleEmployee?.address?.zipcode}</td>
              <td>{props?.singleEmployee?.address?.suite}</td>
              <td>{" "}</td>
              <td>100</td>
              <td>{" "}</td>
              <td>4800</td>
            </tr>
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>{props?.singleEmployee?.address?.zipcode}</td>
              <td>{props?.singleEmployee?.address?.suite}</td>
              <td>1298</td>
              <td>{" "}</td>
              <td>1200</td>
              <td>6000</td>
            </tr>
            <tr>
              <td>{" "}</td>
              <td>{" "}</td>
              <td>{" "}</td>
              <td>Total Debit :- 200</td>
              <td>Total Credit :- 1200</td>
              <td>Current Balance :- 6000</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={handleDownload}>Download</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);