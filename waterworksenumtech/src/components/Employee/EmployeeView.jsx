import React, { useEffect, useState } from "react";
// import "./Subscriber/SubscriberView.css"
import axios from "axios";
import Swal from "sweetalert2";
import EmployeeEditModal from "./EmployeeEditModal";
import EmployeeAttendanceModal from "./EmployeeAttendanceModal";
import LoaderComp from "../LoaderComp";
import { MDBBtn } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

export default function EmployeeView({ setCollapsed }) {
  const [ employee, setEmployee ] = useState([]);
  const [ filteredEmployee, setfilteredEmployee ] = useState([]);
  const [ selectedFilter, setSelectedFilter ] = useState();
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [ editEmployee, seteditEmployee ] = useState([]);
  const [ isAttendanceModalOpen, setIsAttendanceModalOpen ] = useState(false);
  const [ selectedEmployee, setSelectedEmployee ] = useState(
    {}
  );

  useEffect(() => {
    setCollapsed(true);
    fetchSubscriberData();
  }, []);

  const fetchSubscriberData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8090/waterwork/get/getAllEmployee"
      );
      console.log(response.data);
      setEmployee(response.data);
      setfilteredEmployee(response.data); // Set filteredEmployee initially with all data
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const { value } = event.target;

    switch (
    selectedFilter //diffrent value for filtering and diffrent value for searchterm
    ) {
      case "By Name":
        handleFilterName(value);
        break;
      case "By Aadhar":
        handleFilterAadhar(value);
        break;
      case "By Mobile No.":
        handleFilterMobile(value);
        break;
      case "By Employee Id":
        handleFilterEmpId(value);
        break;
      default:
        break;
    }
  };

  const handleFilterChange = (filter) => {
    console.log(filter);
    setSelectedFilter(filter);
  };

  const handleEdit = (employee) => {
    seteditEmployee(employee);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    seteditEmployee(null);
    fetchSubscriberData();
  };

  const handleDelete = async (empNo) => {
    console.log(`Delete action for employee with ID ${empNo}`);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this employee!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User confirmed, proceed with the delete request
        await axios.post(
          `http://localhost:8090/waterwork/delete/deleteEmployeeById?empNo=${empNo}`
        );
        fetchSubscriberData();

        // Show success message
        Swal.fire("Deleted!", "The employee has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Show an error message using Swal
      Swal.fire(
        "Error",
        "An error occurred while deleting the employee.",
        "error"
      );
    }
  };

  const filterOptions = [
    "By Aadhar",
    "By Name",
    "By Mobile No.",
    "By Employee Id",
  ];

  const handleFilterName = (value) => {
    const filteredData = employee.filter((employee) => {
      const name = employee.empName.toLowerCase();
      return name.includes(value.toLowerCase());
    });
    console.log(filteredData);
    setfilteredEmployee(filteredData);
  };

  const handleFilterAadhar = (value) => {
    const filteredData = employee.filter((employee) => {
      const empAadhar = String(employee.empAdharNo);
      return empAadhar.includes(value);
    });
    setfilteredEmployee(filteredData);
  };

  const handleFilterMobile = (value) => {
    const filteredData = employee.filter((employee) => {
      const mobileNo = String(employee.empMobileNo);
      return mobileNo.includes(value);
    });
    setfilteredEmployee(filteredData);
  };

  const handleFilterEmpId = (value) => {
    const filteredData = employee.filter((employee) => {
      const id = String(employee.empNo);
      return id.includes(value);
    });
    setfilteredEmployee(filteredData);
  };

  const handleAttendanceCheck = (employee) => {
    setSelectedEmployee(employee);

    setIsAttendanceModalOpen(true);
  };

  if (loading) {
    return <div>
      <div style={{ display: "grid", placeItems: "center", height: "100vh", width: "100vw" }}>
        <LoaderComp />
      </div>;
    </div>;
  }

  return (
    <>
      <div>
<<<<<<< Faizan
        <form>
====

>>>>>>> main
          <div className="datatable-container">
            <div className="header-tools">
              <div className="search">
                <input type="search" className="search-input" placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch} />
              </div>
              <label className="label">
              <select value={selectedFilter || ""} onChange={(e) => handleFilterChange(e.target.value)}>
                <option value="" disabled>Select Filter</option>
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              </label>
            </div>
            <table className="datatable">
              <thead>
                <tr>
                  <th>Employee No.</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Aadhar Number</th>
                  <th>Mobile Number</th>
                  <th>Joining Date</th>
                  <th>Salary</th>
                  <th>Actions</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployee.map((employee) => (
                  <tr key={employee.empNo} className="table-info">
                    <td>{employee.empNo}</td>
                    <td>
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt={`Avatar`}
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                    </td>
                    <td>
                      <p className="fw-bold mb-1">{employee.empName}</p>
                      <p className="text-muted mb-0">{employee.empAddress}</p>
                    </td>
                    <td>{employee.empAdharNo}</td>
                    <td>{employee.empMobileNo}</td>
                    <td>{employee.empDOJ}</td>
                    <td>{employee.empSalary}</td>
                    <td>
                      {/* Edit and Delete buttons with different icons */}
                      <MDBBtn
                        color="link"
                        rounded
                        size="sm"
                        onClick={() => handleEdit(employee)}
                      >
                        <i className="fas fa-pencil-alt"></i> Edit
                      </MDBBtn>
                      <MDBBtn
                        color="link"
                        rounded
                        size="sm"
                        onClick={() => handleDelete(employee.empNo)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </MDBBtn>
                    </td>
                    <td>
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        onChange={() => handleAttendanceCheck(employee)}
                      />
                    </td>
                  </tr>
                ))}
                {isEditModalOpen && (
                  <EmployeeEditModal
                    employee={editEmployee}
                    closeEditModal={closeEditModal}
                  />
                )}
                {isAttendanceModalOpen && (
                  <EmployeeAttendanceModal
                    isOpen={isAttendanceModalOpen}
                    closeModal={() => setIsAttendanceModalOpen(false)}
                    attendanceData={selectedEmployee}
                  />
                )}
              </tbody>
            </table>
          </div>
        {/* </form > */}
      </div >
    </>
  );
}
