import React, { useEffect } from 'react';
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

const InardwardTransactionView = ({ setCollapsed }) => {
    useEffect(() => {
        setCollapsed(true);
    }, []);
    return (
        // TO make the Container in Middle.
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
                    className="mb-2 me-2 square-search text-white"
                    style={{ marginRight: "8px" }}
                />

                {/* Add a gap between Search Button and Search Input */}
                <div style={{ marginRight: "8px" }}> </div>

                {/* Filter Dropdown */}
                <MDBDropdown className="custom-dropdown">
                    <MDBDropdownToggle className="custom-dropdown-toggle">
                        {"Select Filter"}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="custom-dropdown-menu">
                        {/* Map through filter options to create dropdown items */}
                        {[ 0, 1 ].map((option) => (
                            <MDBDropdownItem
                                className="text-dark"
                                // Adding Style of Cursor Pointer.
                                style={{ cursor: "pointer" }}
                                key={option}
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

                        <th scope="col">Inward Tid</th>
                        <th scope="col">Inward Sid</th>
                        <th scope="col">ReceiptNo</th>
                        <th scope="col">Tamount</th>
                        <th scope="col">Tdate</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {/* Example employee data with added image property */}
                    {[ 0, 1 ].map((employee) => (
                        <tr key={employee.empNo} className="table-info">
                            <td>{employee.empNo}</td>
                            <td>
                                <p className="fw-bold mb-1">{employee.empName}</p>
                                <p className="text-muted mb-0">{employee.empAddress}</p>
                            </td>
                            <td>{employee.empAdharNo}</td>
                            <td>{employee.empMobileNo}</td>
                            <td>{employee.empDOJ}</td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </MDBContainer>
    );
};

export default InardwardTransactionView;