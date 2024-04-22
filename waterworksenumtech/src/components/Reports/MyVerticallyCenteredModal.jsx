import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import signature from './signature.png';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function MyVerticallyCenteredModal(props) {
  console.log(props)
  const singleSubscriber = [...props.singlesubscriber]
  const transData = [...singleSubscriber.slice(1)];
  const subInfo = singleSubscriber[0]
  console.log(transData)
  console.log(subInfo)

  const openingBalance=transData.length>0?transData[0]?.totalbalance - transData[0]?.credit || 0 : 0;

  const totalDebit = transData.reduce((total, elem) => total + (elem.debit || 0), 0);
  const totalCredit = transData.reduce((total, elem) => total + (elem.credit || 0), 0);
  const currentBalance = transData.length > 0 ? transData[transData.length - 1]?.totalbalance-totalDebit || 0 : 0;
  //here calculating all the data whitout hitting the api as it may cause network firewall request and hamper the app performance 


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
    doc.save(`${subInfo.firstName}_${subInfo.lastName}`);
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
          {subInfo?.firstName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover id='employee-table' >
          <thead>
            <tr >
              <td>Customer No.{subInfo?.subscriberNo}</td>
              <td colSpan={4}>Subscriber name :{subInfo?.firstName} {subInfo?.lastName}</td>
              <td>Opening Bal : {openingBalance}</td>
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
            {transData.map(( elem) => (
              <tr key={elem?.tid}>
                <td>{elem?.tdate}</td>
                <td>{elem?.particular}</td>
                <td>{elem?.tid}</td>
                <td>{elem?.debit}</td>
                <td>{elem?.credit}</td>
                <td>{elem?.totalbalance}</td>
              </tr>
            ))}
            <tr>
              <td>{" "}</td>
              <td>{" "}</td>
              <td>{" "}</td>
              <td>Total Debit :  {totalDebit}</td>
              <td>Total Credit :  {totalCredit}</td>
              <td>Current Balance : {currentBalance}</td>
              {/* total balance is incorrect as i need the balance while the user registered */}
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