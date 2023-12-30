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

export default function EmployeeEditModal({ employee, closeEditModal }) {
  const [ centredModal, setCentredModal ] = useState(true);


  const [ formValue, setFormValue ] = useState({
    ...employee,
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [ e.target.name ]: e.target.value });
  };

  const handleClose = () => closeEditModal();

  useEffect(() => {
    // Set centredModal to true when the component mounts
    setCentredModal(true);
  }, []);

  const handleChanges = (id) => {
    console.log(id);
    console.log(formValue);

    axios
      .post(`http://localhost:8090/waterwork/update/updateEmployeeById?empNo=${id}`, formValue)
      .then((response) => {
        console.log("Response data:", response.data);
        handleClose();
        if (response.status === 200) {
          Swal.fire('Success', 'Record updated successfully', 'success');
        } else {
          Swal.fire('Error', 'Failed to update record', 'error');
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        Swal.fire('Error', 'Failed to update record', 'error');
      });
  };


  return (
    <>
      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Employee Update: {formValue.empName}</MDBModalTitle>
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
                    value={formValue.empNo}
                    name="empNo"
                    disabled
                    label="Employee No"
                  />
                </MDBValidationItem>
                <MDBValidationItem className="col-md-4">
                  <MDBInput
                    value={formValue.empName}
                    name="empName"
                    onChange={onChange}
                    required
                    label="Employee Name"
                  />
                </MDBValidationItem>

                <MDBValidationItem className="col-md-4">
                  <MDBInput
                    value={formValue.empAdharNo}
                    name="empAdharNo"
                    onChange={onChange}
                    required
                    label="AADHAR NUMBER"
                  />
                </MDBValidationItem>


                <MDBValidationItem className="col-md-12">
                  <MDBInput
                    value={formValue.empAddress}
                    name="empAddress"
                    onChange={onChange}
                    required
                    label="Address"
                  />
                </MDBValidationItem>
                <MDBValidationItem className="col-md-6">
                  <MDBInput
                    value={formValue.empMobileNo}
                    name="empMobileNo"
                    onChange={onChange}
                    required
                    label="Mobile No"
                  />
                </MDBValidationItem>

                <MDBValidationItem className="col-md-6">
                  <MDBInput
                    value={formValue.empSalary}
                    name="empSalary"
                    onChange={onChange}
                    required
                    label="Employee Salary"
                  />
                </MDBValidationItem>

              </MDBValidation>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={handleClose}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => handleChanges(formValue.empNo)}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
