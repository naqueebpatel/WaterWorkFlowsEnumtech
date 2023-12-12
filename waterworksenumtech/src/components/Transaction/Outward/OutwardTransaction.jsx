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

export default function OutwardTransaction() {

  const [outwardSource, setoutwardSource] = useState([]);
  const [loading, setLoading] = useState(false);

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

  function formatouttdate(outtdate){
      const dateObject = new Date(outtdate);
      const formattedDate = dateObject.toISOString().split('T')[0];
      return formattedDate; 
  }

  const [formValue, setFormValue] = useState({
    outtdate:formatouttdate(Date.now()),
    outamount:"",
    voucherno:generateRandomReceiptNumber(6),
    outwardSid:"",
    paidto:""
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleChanges=(event)=>{
    event.preventDefault()

    const payload={
        outtdate:formValue.outtdate,
        outamount:parseInt(formValue.outamount),
        voucherno:parseInt(formValue.voucherno),
        outwardSid:parseInt(formValue.outwardSid),
        paidto:formValue.paidto
    }

    console.log(payload)

    axios
    .post(`http://localhost:8090/waterwork/add/addOutwardTrans`, payload)
    .then((response) => {
      console.log("Response data:", response.data)
      if (response.status === 200) {
        Swal.fire('Success', 'Added successfully', 'success');
      } else {
        Swal.fire('Error', 'Failed to Add record', 'error');
      }
    })
    .catch((error) => {
        Swal.fire('Error', 'Failed to pay!', 'error');
      console.error("Error:", error.message);
    });

    setFormValue({
      outtdate: formatouttdate(Date.now()),
      outamount: "",
      voucherno: generateRandomReceiptNumber(6),
      outwardSid: "",
      paidto: ""
    });

  }


  return (
    <>
      <MDBContainer className="py-5" style={{ maxWidth: "1100px" }}>
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

                <MDBValidationItem className="col-md-3">
                  <select
                    name="outwardSid"
                    value={formValue.outwardSid}
                    onChange={onChange}
                    className="form-select custom-select" // Added custom-select class
                    required
                  >
                    <option value="" disabled>
                      Select Outward Source
                    </option>
                    {outwardSource.map((source) => (
                      <option key={source.outwardSid} value={source.outwardSid}>
                        {source.outwardSname}
                      </option>
                    ))}
                  </select>
                </MDBValidationItem>
              </MDBValidation>

              <MDBValidationItem className="col-md-4">
                  <MDBInput
                    value={formValue.paidto}
                    name="paidto"
                    onChange={onChange}
                    required
                    label="Details"
                  />
                </MDBValidationItem>
                    
                    
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

