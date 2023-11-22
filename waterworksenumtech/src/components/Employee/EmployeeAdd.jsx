import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
// import 'react-date-picker/dist/DatePicker.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import LoaderComp from "../LoaderComp";

const EmployeeAdd = ({ setCollapsed }) => {
  const [ loading, setLoading ] = useState(false);
  useEffect(() => {
    setCollapsed(true);
  }, []);

  const validationSchema = Yup.object().shape({
    empAdharNo: Yup.string()
      .matches(/^\d{12}$/, "Aadhar number must be 12 digits")
      .required("AADHAR Required"),
    firstName: Yup.string()
      .matches(/^[^\d]+$/, "Invalid")
      .required("First name required"),
    lastName: Yup.string()
      .matches(/^[^\d]+$/, "Invalid")
      .required("Last name required"),
    empMobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile No.?"),
    empSalary: Yup.number()
      .typeError("Salary must be a number")
      .min(1, "Salary must be greater than 0")
      .required("Salary?"),
    empAddress: Yup.string().required("Address Required"),
    empDOJ: Yup.string().required("DATE OF JOINING?"),
  });

  const initialValues = {
    empAdharNo: "",
    empName: "",
    empMobileNo: "",
    empAddress: "",
    empDOJ: "",
    empSalary: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {

      const { empDOJ } = values; // Replace this with your actual date string
      const dateObject = new Date(empDOJ);
      const formattedDate = dateObject.toISOString().split('T')[ 0 ];
      console.log(formattedDate);


      const empName = `${values.firstName} ${values.lastName}`;

      // Create the payload with empName and other fields if needed
      const payload = {
        ...values,
        empName: empName,
        empDOJ: formattedDate
      };

      delete payload.firstName;
      delete payload.lastName;

      console.log("Form Data:", payload);

      const response = await axios.post(
        "http://localhost:8090/waterwork/add/insertEmployee",
        payload
      );

      if (response.status === 200) {
        Swal.fire("Success", "Employee added successfully", "success");
      } else {
        Swal.fire("Error", "Failed to update record", "error");
      }

      console.log("Server response:", response.data);

      const newValues = {
        ...initialValues,
        firstName: "",
        lastName: "",
      };

      resetForm({ values: newValues });
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a non-2xx status
        const status = error.response.status;
        if (status === 400) {
          Swal.fire({
            icon: "error",
            title: "Bad Request",
            text: "There was an issue with your request.",
          });
        } else if (status === 500) {
          Swal.fire({
            icon: "error",
            title: "Internal Server Error",
            text: "An internal server error occurred. Please try again later.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again.",
          });
        }
      } else {
        // Handle other errors (e.g., network error)
        console.error("Submission error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Duplicates Value Not Allowed. Please try again.",
        });
      }
    }
  };

  if (loading) {
    return <div>
      <div style={{ display: "grid", placeItems: "center", height: "100vh", width: "100vw" }}>
        <LoaderComp />
      </div>;
    </div>;
  }
  return (
    <MDBContainer className="py-5" style={{ maxWidth: "900px" }}>
      <MDBRow className="justify-content-center align-items-center">
        <MDBCol>
          <MDBCard className="my-4 shadow-5 justify-content-center align-items-center">
            <MDBCol md="12">
              <MDBCardBody className="p-md-5 text-black">
                <MDBTypography
                  tag="h3"
                  className="mb-3 text-uppercase text-center"
                >
                  Employee Registration
                </MDBTypography>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <MDBRow>
                      <MDBCol md="12">
                        <Field
                          type="number"
                          name="empAdharNo"
                          className="form-control mb-2"
                          placeholder="AADHAR NUMBER"
                        />
                        <ErrorMessage name="empAdharNo">
                          {(msg) => (
                            <div className="error-text">
                              <MDBIcon
                                fas
                                icon="exclamation-circle"
                                size="sm"
                                className="me-1 text-danger"
                              />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol md="6" className="mb-2">
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          className="form-control"
                        />
                        <ErrorMessage name="firstName">
                          {(msg) => (
                            <div className="error-text">
                              <MDBIcon
                                fas
                                icon="exclamation-circle"
                                size="sm"
                                className="me-1 text-danger"
                              />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </MDBCol>
                      <MDBCol md="6" className="mb-2">
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          className="form-control"
                        />
                        <ErrorMessage name="lastName">
                          {(msg) => (
                            <div className="error-text">
                              <MDBIcon
                                fas
                                icon="exclamation-circle"
                                size="sm"
                                className="me-1 text-danger"
                              />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </MDBCol>
                    </MDBRow>

                    <Field
                      type="text"
                      name="empAddress"
                      placeholder="Address"
                      className="form-control mb-2"
                    />
                    <ErrorMessage name="empAddress">
                      {(msg) => (
                        <div className="error-text">
                          <MDBIcon
                            fas
                            icon="exclamation-circle"
                            size="sm"
                            className="me-1 text-danger"
                          />
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                    <MDBRow>
                      <MDBCol md="6" className="mb-2">
                        <label htmlFor="currentBalance" className="form-label">
                          Employee Salary
                        </label>
                        <Field
                          type="number"
                          name="empSalary"
                          className="form-control mb-2"
                          placeholder="Salary"
                        />
                        <ErrorMessage name="empSalary">
                          {(msg) => (
                            <div className="error-text">
                              <MDBIcon
                                fas
                                icon="exclamation-circle"
                                size="sm"
                                className="me-1 text-danger"
                              />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </MDBCol>

                      <MDBCol md="6" className="mb-2 align-items-center">
                        <label htmlFor="empMobileNo" className="form-label">
                          Mobile No.
                        </label>
                        <Field
                          type="number"
                          name="empMobileNo"
                          placeholder="Phone/Mobile"
                          className="form-control"
                        />
                        <ErrorMessage name="empMobileNo">
                          {(msg) => (
                            <div className="error-text">
                              <MDBIcon
                                fas
                                icon="exclamation-circle"
                                size="sm"
                                className="me-1 text-danger"
                              />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </MDBCol>
                    </MDBRow>

                    <MDBCol md="6">
                      <label htmlFor="empDOJ" className="form-label">
                        Date Of Joining
                      </label>
                      <Field
                        type="date"
                        name="empDOJ"
                        className="form-control mb-2"
                      />
                    </MDBCol>

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="submit"
                        className="btn btn-lg ms-2"
                        style={{ backgroundColor: "#00ffff9e" }}
                      >
                        Add Employee!
                      </button>
                    </div>
                  </Form>
                </Formik>
              </MDBCardBody>
            </MDBCol>
            {/* </MDBRow> */}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default EmployeeAdd;
