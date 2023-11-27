import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import LoaderComp from "../LoaderComp";

const SubscriberAdd = ({ setCollapsed }) => {
  const [ zoneData, setZoneData ] = useState([]);
  const [ loading, setLoading ] = useState(false);


  useEffect(() => {
    setCollapsed(true);
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

  const validationSchema = Yup.object().shape({
    subscriberAdharNo: Yup.string()
      .matches(/^\d{12}$/, "Aadhar number must be 12 digits")
      .required("AADHAR Required"),
    firstName: Yup.string()
      .matches(/^[^\d]+$/, "Invalid")
      .required("First name required"),
    lastName: Yup.string()
      .matches(/^[^\d]+$/, "Invalid")
      .required("Last name required"),
    zoneno: Yup.string().required("Zone Number?"),
    subscriberMobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile No.?"),
    subscriberAddress: Yup.string().required("Address Required"),
    subsciberFinancialStatus: Yup.number().required("Financial Status ?"),
    currentBalance: Yup.number()
      .typeError("Current balance must be a number")
      .min(1000, "Current balance must be greater than 1000")
      .required("Balance is required"),
    connectionStatus: Yup.string().required("Connection status ?"),
  });

  const initialValues = {
    subscriberAdharNo: "",
    firstName: "",
    lastName: "",
    zoneno: "",
    subscriberMobileNo: "",
    subscriberAddress: "",
    subsciberFinancialStatus: "",
    currentBalance: 1000,
    connectionStatus: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        // subsciberFinancialStatus: Number(values.subsciberFinancialStatus),
        zoneno: Number(values.zoneno)
      };
      // Perform any API request or other actions here
      console.log("Form Data:", payload);

      Swal.showLoading();
      const response = await axios.post('http://localhost:8090/waterwork/add/addSubscriber', payload);
      Swal.hideLoading();

      if (response.status === 200) {
        Swal.fire('Success', 'Record updated successfully', 'success');
      } else {
        Swal.fire('Error', 'Failed to update record', 'error');
      }


      console.log('Server response:', response.data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      resetForm({ values: initialValues });

    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  if (loading) {
    return <div style={{ display: "grid", placeItems: "center", height: "100vh", width: "100vw" }}>
      <LoaderComp />
    </div>;
  }
  return (
    <MDBContainer style={{
      maxWidth: "1100px", position: "relative",
      left: "75px",
      padding: "105px",
      overflow: "hidden"
    }}>
      <MDBRow className="justify-content-center align-items-center">
        <MDBCol>
          <MDBCard className="my-4 shadow-5 justify-content-center align-items-center">
            <MDBCol md="12">
              <MDBCardBody className="p-md-5 text-black">
                <MDBTypography tag="h3" className="mb-3 text-uppercase text-center">
                  Subscriber Registration
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
                          name="subscriberAdharNo"
                          className="form-control mb-2"
                          placeholder="AADHAR NUMBER"
                        />
                        <ErrorMessage name="subscriberAdharNo">
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
                      name="subscriberAddress"
                      placeholder="Address"
                      className="form-control mb-2"
                    />
                    <ErrorMessage name="subscriberAddress">
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
                      <MDBCol md="4" className="mb-2">
                        <Field
                          as="select"
                          name="zoneno"
                          className="form-select mb-2"
                        >
                          <option value="" disabled>
                            Select Zone Name
                          </option>
                          {zoneData.map((zone) => (
                            <option key={zone.zoneno} value={zone.zoneno}>
                              {zone.zonename}
                            </option>
                          ))}
                        </Field>

                        <ErrorMessage name="zoneno">
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

                      <MDBCol md="4" className="mb-2">
                        <Field
                          as="select"
                          name="subsciberFinancialStatus"
                          className="form-select mb-2"
                        >
                          <option value="" disabled>
                            Financial Status
                          </option>
                          <option value="0">POOR</option>
                          <option value="1">RICH</option>
                        </Field>
                        <ErrorMessage name="subsciberFinancialStatus">
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

                      <MDBCol md="4" className="mb-2">
                        <Field
                          as="select"
                          name="connectionStatus"
                          className="form-select mb-2"
                        >
                          <option value="" disabled>
                            Connection
                          </option>
                          <option value="active">Active</option>
                          <option value="pause">Pause</option>
                          <option value="blocked">Blocked</option>
                        </Field>
                        <ErrorMessage name="connectionStatus">
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
                        <label htmlFor="currentBalance" className="form-label">
                          Current Balance
                        </label>
                        <Field
                          type="number"
                          name="currentBalance"
                          className="form-control mb-2"
                        />
                        <ErrorMessage name="currentBalance">
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

                      <MDBCol md="6" className="mb-2align-items-center">
                        <label htmlFor="subscriberMobileNo" className="form-label">
                          Mobile No.
                        </label>
                        <Field
                          type="number"
                          name="subscriberMobileNo"
                          placeholder="Phone/Mobile"
                          className="form-control"
                        />
                        <ErrorMessage name="subscriberMobileNo">
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

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="submit"
                        className="btn btn-lg ms-2"
                        style={{ backgroundColor: "#00ffff9e" }}
                      >
                        Add Subscriber!
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
    </MDBContainer >
  );
};

export default SubscriberAdd;
