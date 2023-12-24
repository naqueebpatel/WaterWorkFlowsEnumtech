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
export default function OutwardTransaction() {

  const [ outwardSource, setoutwardSource ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ incorrectPrice, setIncorrectPrice ] = useState({
    icon: "",
    text: "",
  });
  const [ qunatityInputToggle, setQunatityInputToggle ] = useState(true);
  const [ toggleButton, setToggleBUtton ] = useState(true);


  useEffect(() => {
    fetchOutwardSourceData();
  }, []);

  const fetchOutwardSourceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8090/waterwork/get/getAllOutwardSource"
      );
      setoutwardSource(response.data); // Assuming data is an array of objects with zonename and zoneno attributes
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

  function formatouttdate(outtdate) {
    const dateObject = new Date(outtdate);
    const formattedDate = dateObject.toISOString().split('T')[ 0 ];
    return formattedDate;
  }

  const [ formValue, setFormValue ] = useState({
    outtdate: formatouttdate(Date.now()),
    outamount: "",
    confirmamount: "",
    voucherno: generateRandomReceiptNumber(6),
    outwardSid: "",
    paidto: "",
    qty: 0,
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [ e.target.name ]: e.target.value });
    if (e.target.name === "outwardSid") {
      if (e.target.value === "1" || e.target.value === "2") {
        setQunatityInputToggle(false);
      }
      else {
        setQunatityInputToggle(true);
      }
    }

    if (formValue.outamount !== "" && formValue.confirmamount !== "" && formValue.outwardSid !== NaN && formValue.paidto !== "") {
      setToggleBUtton(false);
    } else {
      setToggleBUtton(true);
    }
  };

  const handleQuantity = (val) => {
    console.log({ ...formValue });
    setFormValue({ ...formValue, qty: +formValue.qty + val });
  };



  const handleChanges = (event) => {
    event.preventDefault();

    if (formValue.outamount !== formValue.confirmamount) {
      setIncorrectPrice({
        icon: <IoWarning />,
        text: "Incorrect Price"
      });
    } else {
      setIncorrectPrice({
        icon: "",
        text: "",
      });
      const payload = {
        outtdate: formValue.outtdate,
        outamount: parseInt(formValue.outamount),
        voucherno: parseInt(formValue.voucherno),
        outwardSid: parseInt(formValue.outwardSid),
        paidto: formValue.paidto,
        qty: parseInt(formValue.qty),
      };

      console.log(payload);

      // axios
      //   .post(`http://localhost:8090/waterwork/add/addOutwardTrans`, payload)
      //   .then((response) => {
      //     console.log("Response data:", response.data);
      //     if (response.status === 200) {
      //       Swal.fire('Success', 'Added successfully', 'success');
      //     } else {
      //       Swal.fire('Error', 'Failed to Add record', 'error');
      //     }
      //   })
      //   .catch((error) => {
      //     Swal.fire('Error', 'Failed to pay!', 'error');
      //     console.error("Error:", error.message);
      //   });

      setFormValue({
        outtdate: formatouttdate(Date.now()),
        outamount: "",
        confirmamount: "",
        voucherno: generateRandomReceiptNumber(6),
        outwardSid: "",
        paidto: "",
        qty: 0,
      });
      setToggleBUtton(true);
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
                    Outward Transaction
                  </MDBTypography>
                  <form onSubmit={handleChanges}>
                    <MDBValidation className="row g-3">
                      <MDBValidationItem className="col-md-3">
                        <MDBInput
                          value={formValue.outtdate}
                          name="outtdate"
                          disabled
                          type="date"
                          label="Transaction Date"
                        />
                      </MDBValidationItem>
                      <MDBValidationItem className="col-md-3">
                        <MDBInput
                          value={formValue.voucherno}
                          type="number"
                          name="voucherno"
                          disabled
                          label="Receipt No"
                        />
                      </MDBValidationItem>
                      <MDBValidationItem className="col-md-3">
                        <MDBInput
                          value={formValue.outamount}
                          name="outamount"
                          onChange={onChange}
                          required
                          label="₹ XX-XX"
                        />
                      </MDBValidationItem>
                      <MDBValidation className="col-md-3">
                        <MDBInput
                          value={formValue.confirmamount}
                          name="confirmamount"
                          onChange={onChange}
                          required
                          label="Confirm ₹ XX-XX"
                        />
                        <span className=" fs-4 text-danger">{incorrectPrice.icon}    {incorrectPrice.text}</span>
                      </MDBValidation>
                      <MDBValidationItem className="col-md-3">
                        <select
                          name="outwardSid"
                          value={formValue.outwardSid}
                          onChange={onChange}
                          className="form-select custom-select" // Added custom-select class
                          required
                        >
                          <option>
                            Select Outward Source
                          </option>
                          <option value="1">
                            Water Bottle
                          </option>
                          <option value="2">
                            Water Bottle Cap
                          </option>
                          <option value="3">
                            Extras
                          </option>
                          {outwardSource.map((source) => (
                            <option key={source.outwardSid} value={source.outwardSid}>
                              {source.outwardSname}
                            </option>
                          ))}
                        </select>
                      </MDBValidationItem>
                    </MDBValidation>
                    <div className="row mt-3">
                      <MDBValidationItem className="col-md-4">
                        <MDBInput
                          value={formValue.paidto}
                          name="paidto"
                          onChange={onChange}
                          // required
                          label="Details"
                        />
                      </MDBValidationItem>
                      <MDBValidationItem className="col-md-4 d-flex">
                        < input type="button" className="btn btn-primary" disabled={qunatityInputToggle} onClick={() => { handleQuantity(1); }} value="+" />
                        <MDBInput
                          value={formValue.qty}
                          name="qty"
                          onChange={onChange}
                          required
                          label="Quantity"
                          disabled={qunatityInputToggle}
                        />
                        <input type="button" className="btn btn-primary" disabled={qunatityInputToggle} onClick={() => { handleQuantity(-1); }} value="-" />
                      </MDBValidationItem>
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                      <button
                        disabled={toggleButton}
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

