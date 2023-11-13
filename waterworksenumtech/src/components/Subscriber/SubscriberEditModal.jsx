import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBValidation,
  MDBValidationItem,
  MDBInput
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";

export default function SubscriberEditModal({ subscriber, closeEditModal }) {
  const [centredModal, setCentredModal] = useState(true);

  const [zoneData, setZoneData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchZoneData();
  }, []);

  const fetchZoneData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8090/waterwork/get/getZone"
      );
      setZoneData(response.data); // Assuming data is an array of objects with zonename and zoneno attributes
    } catch (error) {
      console.error("Error fetching zone data:", error);
    } finally {
      setLoading(false);
    }
  };

  const [formValue, setFormValue] = useState({
    ...subscriber,
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleClose = () => closeEditModal();

  useEffect(() => {
    // Set centredModal to true when the component mounts
    setCentredModal(true);
  }, []);

  const handleChanges=(id)=>{
    console.log(id)
    console.log(formValue)

    axios
    .post(`http://localhost:8090/waterwork/update/UpdatedRecord/${id}`, formValue)
    .then((response) => {
      console.log("Response data:", response.data);
      handleClose()
      if (response.status === 200) {
        Swal.fire('Success', 'Record updated successfully', 'success');
      } else {
        Swal.fire('Error', 'Failed to update record', 'error');
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
  }


  return (
    <>
      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Subscriber Update: {formValue.firstName}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBValidation className="row g-3">
                <MDBValidationItem className="col-md-4">
                  <MDBInput
                    value={formValue.subscriberNo}
                    name="subscriberNo"
                    disabled
                    label="Subscriber No"
                  />
                </MDBValidationItem>
                <MDBValidationItem className="col-md-4">
                  <MDBInput
                    value={formValue.firstName}
                    name="firstName"
                    onChange={onChange}
                    required
                    label="First Name"
                  />
                </MDBValidationItem>
                <MDBValidationItem className="col-md-4">
                  <MDBInput
                    value={formValue.lastName}
                    name="lastName"
                    onChange={onChange}
                    required
                    label="Last Name"
                  />
                </MDBValidationItem>

                <MDBValidationItem className="col-md-4">
                  <MDBInput
                    value={formValue.subscriberAdharNo}
                    name="subscriberAdharNo"
                    onChange={onChange}
                    required
                    label="AADHAR NUMBER"
                  />
                </MDBValidationItem>
                
                
                <MDBValidationItem className="col-md-8">
                  <MDBInput
                    value={formValue.subscriberAddress}
                    name="subscriberAddress"
                    onChange={onChange}
                    required
                    label="Address"
                  />
                </MDBValidationItem>
                <MDBValidationItem className="col-md-6">
                  <MDBInput
                    value={formValue.subscriberMobileNo}
                    name="subscriberMobileNo"
                    onChange={onChange}
                    required
                    label="Mobile No"
                  />
                </MDBValidationItem>

                <MDBValidationItem className="col-md-6">
                  <MDBInput
                    value={formValue.currentBalance}
                    name="currentBalance"
                    onChange={onChange}
                    required
                    label="Current Balance"
                  />
                </MDBValidationItem>
                <MDBValidationItem className="col-md-4">
                  <select
                    name="subsciberFinancialStatus"
                    value={formValue.subsciberFinancialStatus}
                    onChange={onChange}
                    className="form-select custom-select" // Added custom-select class
                    required
                  >
                    <option value="" disabled>
                      Financial Status
                    </option>
                    <option value="0">POOR</option>
                    <option value="1">RICH</option>
                  </select>
                </MDBValidationItem>
                <MDBValidationItem className="col-md-4">
                  <select
                    name="connectionStatus"
                    value={formValue.connectionStatus}
                    onChange={onChange}
                    className="form-select custom-select" // Added custom-select class
                    required
                  >
                    <option value="" disabled>
                      Connection
                    </option>
                    <option value="active">Active</option>
                    <option value="paused">Pause</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </MDBValidationItem>

                <MDBValidationItem className="col-md-4">
                  <select
                    name="zoneno"
                    value={formValue.zoneno}
                    onChange={onChange}
                    className="form-select custom-select" // Added custom-select class
                    required
                  >
                    <option value="" disabled>
                      Select Zone Name
                    </option>
                    {zoneData.map((zone) => (
                      <option key={zone.zoneno} value={zone.zoneno}>
                        {zone.zonename}
                      </option>
                    ))}
                  </select>
                </MDBValidationItem>
              </MDBValidation>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={handleClose}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => handleChanges(formValue.subscriberNo)}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
