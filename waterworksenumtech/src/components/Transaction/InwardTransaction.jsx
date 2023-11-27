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

export default function InwardTransaction() {

  const [ inwardSource, setInwardSource ] = useState([]);
  const [ loading, setLoading ] = useState(false);

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
    receiptno: generateRandomReceiptNumber(5),
    inwardsid: ""
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [ e.target.name ]: e.target.value });
  };

  const handleChanges = (event) => {
    event.preventDefault();

    const payload = {
      tdate: formValue.tdate,
      tamount: parseInt(formValue.tamount),
      reciptno: parseInt(formValue.receiptno),
      inwardsid: parseInt(formValue.inwardsid)
    };

    console.log(payload);

    setFormValue({
      tdate: formatDate(Date.now()),
      tamount: "",
      receiptno: generateRandomReceiptNumber(5),
      inwardsid: "",
    });

    axios
      .post(`http://localhost:8090/waterwork/add/addInwardTrans`, payload)
      .then((response) => {
        console.log("Response data:", response.data);
        if (response.status === 200) {
          Swal.fire('Success', 'Updated successfully', 'success');
        } else {
          Swal.fire('Error', 'Failed to update record', 'error');
        }
      })
      .catch((error) => {
        Swal.fire('Error', 'Failed to pay!', 'error');
        console.error("Error:", error.message);
      });
  };


  return (
    <>
      <MDBContainer className="py-5" style={{
        position: "relative",
        left: "6vw",
        width: "60dvw"
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
                        <select
                          name="inwardsid"
                          value={formValue.inwardsid}
                          onChange={onChange}
                          className="form-select custom-select" // Added custom-select class
                          required
                        >
                          <option value="" disabled>
                            Select Inward Source
                          </option>
                          {inwardSource.map((source) => (
                            <option key={source.inwardSid} value={source.inwardSid}>
                              {source.inwardSname}
                            </option>
                          ))}
                        </select>
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

