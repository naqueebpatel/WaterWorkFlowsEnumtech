import React, { useState, useEffect } from "react";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import { IoWarning } from "react-icons/io5";
export default function InwardTransaction() {

  const [ inwardSource, setInwardSource ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ incorrectAmountError, setIncorrectAmountError ] = useState({
    icon: "",
    text: "",
  });
  const [ toggleButton, setToggleButton ] = useState(true);
  const [ itemAmount, setItemAmount ] = useState(2);

  useEffect(() => {
    fetchInwardSourceData();
  }, []);

  const fetchInwardSourceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8090/waterwork/get/getAllInwardSource"
      );
      setInwardSource(response.data); // Assuming data is an array of objects with zonename and zoneno attributes
    } catch (error) {
      console.error("Error fetching zone data:", error);
    } finally {
      setLoading(false);
    }
  };

  function generateRandomReceiptNumber(length) {
    const characters = '0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  function formatDate(tdate) {
    const dateObject = new Date(tdate);
    const formattedDate = dateObject.toISOString().split('T')[ 0 ];
    return formattedDate;
  }

  const [ formValue, setFormValue ] = useState({
    tdate: formatDate(Date.now()),
    tamount: "",
    confirmAmount: "",
    receiptno: generateRandomReceiptNumber(5),
    inwardSid: "",
    qty: 0,
    total: 0,
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [ e.target.name ]: e.target.value });
    if (e.target.name === "inwardSid") {
      if (e.target.value === '1') {
        setToggleButton(false);
        setItemAmount(50);
      } else if (e.target.value === '2') {
        setToggleButton(false);
        setItemAmount(10);
      }
      else {
        setFormValue({ ...formValue, qty: 0, total: 0 });
        setToggleButton(true);
      }
    }
  };

  const hanldeQuantity = (val) => {
    if (val === 1) {
      console.log({ ...formValue, qty: +formValue.qty + val, total: formValue.total + itemAmount });
      setFormValue({ ...formValue, qty: +formValue.qty + val, total: formValue.total + itemAmount });
    } else {
      setFormValue({ ...formValue, qty: +formValue.qty + val, total: formValue.total - itemAmount });
    }
  };

  const handleChanges = (event) => {
    event.preventDefault();

    if (formValue.tamount !== formValue.confirmAmount) {
      setIncorrectAmountError({
        icon: <IoWarning />,
        text: "Incorrect Amount",
      });
    } else {
      setIncorrectAmountError({
        icon: "",
        text: "",
      });

      const payload = {
        tdate: formValue.tdate,
        tamount: parseInt(formValue.tamount),
        receiptno: parseInt(formValue.receiptno),
        inwardSid: parseInt(formValue.inwardSid),
        qty: parseInt(formValue.qty),
        total: parseInt(formValue.total),
      };

      console.log(payload);

      // axios
      //   .post(`http://localhost:8090/waterwork/add/addInwardTrans`, payload)
      //   .then((response) => {
      //     console.log("Response data:", response.data);
      //     if (response.status === 200) {
      //       Swal.fire('Success', 'Updated successfully', 'success');
      //     } else {
      //       Swal.fire('Error', 'Failed to update record', 'error');
      //     }
      //   })
      //   .catch((error) => {
      //     Swal.fire('Error', 'Failed to pay!', 'error');
      //     console.error("Error:", error.message);
      //   });

      setFormValue({
        tdate: formatDate(Date.now()),
        tamount: "",
        confirmAmount: "",
        receiptno: generateRandomReceiptNumber(5),
        inwardSid: "",
        qty: 0,
        total: 0,
      });
    }
  };


  return (
    <>
      <MDBContainer className="py-5" style={{
        width: "83vw",
        position: "relative",
        top: "8vh",
        left: "8vw",
      }}>
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol>
            <MDBCard className="my-4 shadow-5 justify-content-center align-items-center">
              <MDBCol md="12">
                <MDBCardBody className="p-md-5 text-black">
                  <MDBTypography
                    tag="h3"
                    className="mb-3 text-uppercase text-center"
                  >
                    Inward Transaction
                  </MDBTypography>
                  <form onSubmit={handleChanges}>
                    <MDBValidation className="row g-3">
                      <MDBValidationItem className="col-md-3">
                        <MDBInput
                          value={formValue.tdate}
                          name="tdate"
                          disabled
                          type="date"
                          label="Transaction Date"
                        />
                      </MDBValidationItem>
                      <MDBValidationItem className="col-md-3">
                        <MDBInput
                          value={formValue.receiptno}
                          type="number"
                          name="receiptno"
                          disabled
                          label="Receipt No"
                        />
                      </MDBValidationItem>



                      <MDBValidationItem className="col-md-3">
                        <MDBInput
                          value={formValue.tamount}
                          name="tamount"
                          onChange={onChange}
                          required
                          label="₹ XX-XX"
                        />
                      </MDBValidationItem>
                      <MDBValidationItem className="col-md-3">
                        <MDBInput
                          value={formValue.confirmAmount}
                          name="confirmAmount"
                          onChange={onChange}
                          required
                          label="₹ XX-XX"
                        />
                        <span className=" fs-4 text-danger">{incorrectAmountError.icon}   {incorrectAmountError.text}</span>
                      </MDBValidationItem>
                      <MDBValidationItem className="col-md-3">
                        <select
                          name="inwardSid"
                          value={formValue.inwardSid}
                          onChange={onChange}
                          className="form-select custom-select" // Added custom-select class
                          required
                        >
                          <option value="" disabled>
                            Select Inward Source
                          </option>
                          {/* {inwardSource.map((source) => (
                            <option key={source.inwardSid} value={source.inwardSid}>
                              {source.inwardSname}
                            </option>
                          ))} */}
                          <option value="1">Water Bottle</option>
                          <option value="2">Water Bottle Cap</option>
                          <option value="3">Extras</option>
                        </select>
                      </MDBValidationItem>
                      <MDBValidationItem className="col-md-3 d-flex">
                        <input disabled={toggleButton} className="btn btn-primary" type="button" value="+" onClick={() => hanldeQuantity(1)} />
                        <MDBInput
                          value={formValue.qty}
                          name="qty"
                          onChange={onChange}
                          required
                          label="Quantity"
                          disabled={toggleButton}
                        />
                        <input disabled={toggleButton} className="btn btn-primary" type="button" value="-" onClick={() => hanldeQuantity(-1)} />
                      </MDBValidationItem>
                      <MDBValidationItem className="col-md-3">
                        <MDBInput
                          value={formValue.total}
                          name="total"
                          onChange={onChange}
                          required
                          label="₹ XX-XX"
                          disabled
                        />
                      </MDBValidationItem>
                    </MDBValidation>

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="submit"
                        className="btn btn-lg ms-2"
                        style={{ backgroundColor: "#00ffff9e" }}
                      >
                        PAY!
                      </button>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCol>
              {/* </MDBRow> */}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    </>
  );
}

