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
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";

export default function EmployeeAttendanceModal({ isOpen, closeModal, attendanceData }) {
  const [ centredModal, setCentredModal ] = useState(true);
  const [ data, setData ] = useState({ ...attendanceData });


  const currentDate = new Date();
  const initialOutTime = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000);

  const formatTime = (date) => {
    return date.toTimeString().split(' ')[ 0 ];
  };

  const [ formValue, setFormValue ] = useState({
    empNo: '',
    dateofAtt: currentDate.toISOString().split('T')[ 0 ],
    intime: formatTime(currentDate),
    outtime: formatTime(initialOutTime),
    status: ""
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [ e.target.name ]: e.target.value, empNo: data.empNo });
  };

  const handleClose = () => closeModal();

  useEffect(() => {
    // Set centredModal to true when the component mounts
    setCentredModal(true);
  }, []);

  const handleChanges = (id) => {
    console.log(id);
    console.log(formValue);

    axios
      .post(`http://localhost:8090/waterwork/add/registerAttd?empNo=${id}`, formValue)
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
              <MDBModalTitle>Attendance: {data.empName}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBValidation className="row g-3">

                <MDBValidationItem className="col-md-6">
                  <MDBInput
                    value={data.empNo}
                    name="empNo"
                    disabled
                    label="Employee No"
                  />
                </MDBValidationItem>
                <MDBValidationItem className="col-md-6">
                  <MDBInput
                    value={data.empName}
                    name="empName"
                    disabled
                    label="Employee Name"
                  />
                </MDBValidationItem>


                <MDBValidationItem className="col-md-6">
                  <MDBInput
                    value={formValue.dateofAtt}
                    name="dateofAtt"
                    disabled
                    label="DATE OF ATTENDANCE"
                  />
                </MDBValidationItem>

                <MDBValidationItem className="col-md-6">
                  <select
                    name="status"
                    value={formValue.status}
                    onChange={onChange}
                    className="form-select custom-select" // Added custom-select class
                    required
                  >
                    <option value="" disabled>
                      Attendance
                    </option>
                    <option value="absent">ABSENT</option>
                    <option value="present">PRESENT</option>
                  </select>
                </MDBValidationItem>



                <MDBValidationItem className="col-md-6">
                  <MDBInput
                    value={formValue.intime}
                    name="intime"
                    onChange={onChange}
                    required
                    label="IN TIME"
                  />
                </MDBValidationItem>

                <MDBValidationItem className="col-md-6">
                  <MDBInput
                    value={formValue.outtime}
                    name="outtime"
                    onChange={onChange}
                    required
                    label="OUT TIME"
                  />
                </MDBValidationItem>



              </MDBValidation>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={handleClose}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => handleChanges(data.empNo)}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
