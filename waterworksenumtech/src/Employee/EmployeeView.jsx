import React, { useEffect, useState } from "react";
// import "./Subscriber/SubscriberView.css"
import {
  MDBBadge,
  MDBBtn,
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import axios from "axios";

import Swal from "sweetalert2";
import EmployeeEditModal from "./EmployeeEditModal";
import EmployeeAttendanceModal from "./EmployeeAttendanceModal";

export default function EmployeeView() {
  const [employee, setEmployee] = useState([]);
  const [filteredEmployee, setfilteredEmployee] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editEmployee, seteditEmployee] = useState([]);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(
    {}
  );

  useEffect(() => {
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
    return <div>Loading...</div>;
  }

  return (
    <MDBContainer className="my-5 mt-4">
      {/* Search Bar and Filter Options with Margins */}

      <div className="mb-3 d-flex align-items-center">
        <MDBInput
          type="text"
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-2 me-2 square-search"
          style={{ marginRight: "8px" }}
        />

        {/* Add a gap between Search Button and Search Input */}
        <div style={{ marginRight: "8px" }}> </div>

        {/* Filter Dropdown */}
        <MDBDropdown className="custom-dropdown">
          <MDBDropdownToggle className="custom-dropdown-toggle">
            {selectedFilter || "Select Filter"}
          </MDBDropdownToggle>
          <MDBDropdownMenu className="custom-dropdown-menu">
            {/* Map through filter options to create dropdown items */}
            {filterOptions.map((option) => (
              <MDBDropdownItem
                key={option}
                onClick={() => handleFilterChange(option)}
              >
                {option}
              </MDBDropdownItem>
            ))}
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>

      {/* Subscriber Table */}
      <MDBTable align="middle" className="table-bordered">
        <MDBTableHead>
          <tr className="table-success">
            <th scope="col">Employee No.</th>
            <th scope="col">Profile</th>
            <th scope="col">Name</th>
            <th scope="col">Aadhar Number</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Joining Date</th>
            <th scope="col">Salary</th>
            <th scope="col">Actions</th>
            <th scope="col">Attendance</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {/* Example employee data with added image property */}
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
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheck${employee.empNo}`}
                  onChange={() => handleAttendanceCheck(employee)}
                />
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
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
    </MDBContainer>
  );
}
