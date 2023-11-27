import React, { useEffect, useState } from "react";
import "./SubscriberView.css";
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
import SubscriberEditModal from "./SubscriberEditModal";
import Swal from "sweetalert2";
import LoaderComp from "../LoaderComp";

export default function SubscriberView({ setCollapsed }) {
  const [ subscriber, setSubscriber ] = useState([]);
  const [ filteredSubscribers, setFilteredSubscribers ] = useState([]);
  const [ selectedFilter, setSelectedFilter ] = useState();
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [ editSubscriber, setEditSubscriber ] = useState([]);

  useEffect(() => {
    setCollapsed(true);
    fetchSubscriberData();
  }, []);

  const fetchSubscriberData = async () => {
    try {
      setLoading(true);
      Swal.isLoading();
      const response = await axios.get(
        'http://localhost:8090/waterwork/get/getAllSubscriber'
      );
      setSubscriber(response.data);
      setFilteredSubscribers(response.data); // Set filteredSubscribers initially with all data
      Swal.hideLoading();
    } catch (error) {
      console.error('Error fetching subscriber data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const { value } = event.target;

    switch (selectedFilter) {   //diffrent value for filtering and diffrent value for searchterm
      case "By Name":
        handleFilterName(value);
        break;
      case "By Aadhar":
        handleFilterAadhar(value);
        break;
      case "By Mobile No.":
        handleFilterMobile(value);
        break;
      default:
        break;
    }
  };


  const handleFilterChange = (filter) => {
    console.log(filter);
    setSelectedFilter(filter);
  };

  const handleEdit = (subscriber) => {
    setEditSubscriber(subscriber);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditSubscriber(null);
    fetchSubscriberData();
  };

  const handleDelete = async (subscriberNo) => {
    console.log(`Delete action for subscriber with ID ${subscriberNo}`);
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this subscriber!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        // User confirmed, proceed with the delete request
        await axios.post(`http://localhost:8090/waterwork/delete/deleteSubscriberById?subscriberNo=${subscriberNo}`);
        fetchSubscriberData();

        // Show success message
        Swal.fire('Deleted!', 'The subscriber has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      // Show an error message using Swal
      Swal.fire('Error', 'An error occurred while deleting the subscriber.', 'error');
    }
  };

  const filterOptions = [ "By Aadhar", "By Name", "By Mobile No." ];

  const handleFilterName = (value) => {
    const filteredData = subscriber.filter((subscriber) => {
      const firstName = subscriber.firstName.toLowerCase();
      return firstName.includes(value.toLowerCase());
    });
    console.log(filteredData);
    setFilteredSubscribers(filteredData);
  };

  const handleFilterAadhar = (value) => {
    const filteredData = subscriber.filter((subscriber) => {
      const aadharNo = String(subscriber.subscriberAdharNo);
      return aadharNo.includes(value);
    });
    setFilteredSubscribers(filteredData);
  };

  const handleFilterMobile = (value) => {
    const filteredData = subscriber.filter((subscriber) => {
      const mobileNo = String(subscriber.subscriberMobileNo);
      return mobileNo.includes(value);
    });
    setFilteredSubscribers(filteredData);
  };

  if (loading) {
    return (
      <div>
        <div style={{ display: "grid", placeItems: "center", height: "100vh", width: "100vw" }}>
          <LoaderComp />
        </div>;
      </div>
    );
  }

  return (
    // Style To make the container in Middle.
    <MDBContainer style={{
      width: "fit-content",
      position: "relative",
      top: "8vh",
      left: "8vw"
    }}>
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
        <div style={{ marginRight: "8px" }}>   </div>



        {/* Filter Dropdown */}
        <MDBDropdown className="custom-dropdown">
          <MDBDropdownToggle className="custom-dropdown-toggle">
            {selectedFilter || "Select Filter"}
          </MDBDropdownToggle>
          <MDBDropdownMenu className="custom-dropdown-menu">
            {/* Map through filter options to create dropdown items */}
            {filterOptions.map((option) => (
              <MDBDropdownItem key={option} onClick={() => handleFilterChange(option)}
                className="text-dark"
                // Adding Style of Cursor Pointer.
                style={{ cursor: "pointer" }}>
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
            <th scope="col">Profile</th>
            <th scope="col">Name</th>
            <th scope="col">Aadhar Number</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Status</th>
            <th scope="col">Current Balance</th>
            <th scope="col">Financial Status</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {/* Example subscriber data with added image property */}
          {filteredSubscribers.map((subscriber) => (
            <tr key={subscriber.subscriberNo} className="table-info">
              <td>
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt={`Avatar`}
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
              </td>
              <td>
                <p className="fw-bold mb-1">{`${subscriber.firstName} ${subscriber.lastName}`}</p>
                <p className="text-muted mb-0">{subscriber.subscriberAddress}</p>
              </td>
              <td>{subscriber.subscriberAdharNo}</td>
              <td>{subscriber.subscriberMobileNo}</td>
              <td>
                <MDBBadge
                  color={
                    subscriber.connectionStatus === "active"
                      ? "success"
                      : subscriber.connectionStatus === "paused"
                        ? "primary"
                        : subscriber.connectionStatus === "blocked"
                          ? "danger"
                          : "warning"
                  }
                  pill
                >
                  {
                    subscriber.connectionStatus === "active"
                      ? "Active"
                      : subscriber.connectionStatus === "paused"
                        ? "Paused"
                        : subscriber.connectionStatus === "blocked"
                          ? "Blocked"
                          : "warning"
                  }
                </MDBBadge>
              </td>
              <td>{subscriber.currentBalance}</td>
              <td>{subscriber.subsciberFinancialStatus === "0" ? 'POOR' : 'RICH'}</td>
              <td>
                {/* Edit and Delete buttons with different icons */}
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  onClick={() => handleEdit(subscriber)}
                >
                  <i className="fas fa-pencil-alt"></i> Edit
                </MDBBtn>
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  onClick={() => handleDelete(subscriber.subscriberNo)}
                >
                  <i className="fas fa-trash"></i> Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      {isEditModalOpen && (
        <SubscriberEditModal subscriber={editSubscriber} closeEditModal={closeEditModal} />
      )}
    </MDBContainer>
  );
}
