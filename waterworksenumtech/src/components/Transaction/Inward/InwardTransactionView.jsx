import React, { useEffect, useState } from "react";
import {
    MDBBadge,
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
import { IoIosArrowUp } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";
import LoaderComp from "../../LoaderComp";
// import "./OutwardTransaction.css"

function formatDateWithoutTime(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const InwardTransactionView = ({ setCollapsed }) => {
    const [inwardTrans, setInwardTrans] = useState([]);
    const [filterInward, setFilterInward] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [date, setDate] = useState({
        startDate: "",
        endDate: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
          setCollapsed(true);
        fetchInwardTrans();
    }, []);

    const fetchInwardTrans = async () => {
        try {
            setLoading(true);
            Swal.isLoading();
            const response = await axios.get(
                "http://localhost:8090/waterwork/get/getAllInwardTrans"
            );
            console.log(response.data);
            setInwardTrans(response.data);
            setFilterInward(response.data); // Set filteredoutwardTranss initially with all data
            Swal.hideLoading();
        } catch (error) {
            console.error("Error fetching inwardTrans data:", error);
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
            case "By Tid":
                handleFilterTid(value);
                break;
            case "By Sid":
                handleFilterSid(value);
                break;
            case "By Receipt No.":
                handleFilterReceipt(value);
                break;
            default:
                break;
        }
    };

    const handleFilterChange = (filter) => {
        console.log(filter);
        setSelectedFilter(filter);

        switch (filter) {
            case "HIGH to LOW":
                handleSortHighToLow();
                break;
            case "LOW to HIGH":
                handleSortLowToHigh();
                break;
            case "Date":
                handleFilterDate();
                break;
            default:
                break;
        }
    };

    const filterOptions = ["By Tid", "By Sid", "By Receipt No."];


    const handleDateEvent = (event) => {
        setDate({
            ...date,
            [event.target.name]: event.target.value,
        });
    };

    const handleFilterTid = (value) => {
        const filteredData = inwardTrans.filter((inwardTrans) => {
            const tid = String(inwardTrans.inwardTid);
            return tid.includes(value);
        });
        setFilterInward(filteredData);
    };

    const handleFilterSid = (value) => {
        const filteredData = inwardTrans.filter((inwardTrans) => {
            const sid = String(inwardTrans.inwardSid);
            return sid.includes(value);
        });
        setFilterInward(filteredData);
    };


    const handleFilterReceipt = (value) => {
        const filteredData = inwardTrans.filter((inward) => {
            const receiptNo = String(inward.receiptno);
            return receiptNo.includes(value);
        })
        setFilterInward(filteredData);
    }

    const handleFilterDate = () => {
        const startDate = new Date(date.startDate);
        const endDate = new Date(date.endDate);

        const filteredData = inwardTrans.filter((inwardTrans) => {
            const transactionDate = new Date(inwardTrans.tdate);
            return transactionDate >= startDate && transactionDate <= endDate;
        });

        setFilterInward(filteredData);
    };

    const handleSortHighToLow = () => {
        const sortedData = [...filterInward].sort(
            (a, b) => b.tamount - a.tamount
        );
        setFilterInward(sortedData);
    };

    const handleSortLowToHigh = () => {
        const sortedData = [...filterInward].sort(
            (a, b) => a.tamount - b.tamount
        );
        setFilterInward(sortedData);
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
        // TO make the Container in Middle.
        <MDBContainer
            style={{
                width: "fit-content",
                position: "relative",
                top: "8vh",
                left: "8vw",
            }}
        >
            {/* Search Bar and Filter Options with Margins */}

            <div className="mb-3 d-flex align-items-center">
                <MDBInput
                    type="text"
                    label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-2 me-2 square-search text-white"
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
                        <MDBDropdownItem onClick={() => handleFilterChange("HIGH to LOW")}>
                            HIGH to LOW
                        </MDBDropdownItem>
                        <MDBDropdownItem onClick={() => handleFilterChange("LOW to HIGH")}>
                            LOW to HIGH
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
                <div className="date px-3 py-2 rounded">
                    Date
                    <div className="icon">
                        <IoIosArrowUp />
                    </div>
                    <div className="date-input px-3 py-2 rounded text-white">
                        <h5>From</h5>
                        <input type="date" name="startDate" onChange={handleDateEvent} />
                        <h5>To</h5>
                        <input type="date" name="endDate" onChange={handleDateEvent} />
                        <button onClick={handleFilterDate}>Search</button>
                    </div>
                </div>
            </div>

            {/* inwardTrans Table */}
            <MDBTable align="middle" className="table-bordered">
                <MDBTableHead>
                    <tr className="table-success">
                        <th scope="col">Inward Tid</th>
                        <th scope="col">Inward Sid</th>
                        <th scope="col">Receipt No.</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Transaction Date</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {/* Example inward data with added image property */}
                    {filterInward.map((inward) => (
                        <tr key={inward.inwardTid} className="table-info">
                            <td>{inward.inwardTid}</td>
                            <td>
                                <p className="fw-bold mb-1">{inward.inwardSid}</p>
                            </td>
                            <td>{inward.receiptno}</td>
                            <td>
                                <MDBBadge
                                    color={
                                        inward.tamount >= 1000
                                            ? "success"
                                            : inward.outamount > 2000
                                                ? "primary"
                                                : inward.outamount < 500
                                                    ? "danger"
                                                    : "warning"
                                    }
                                    pill
                                >
                                    ₹ {inward.tamount}
                                </MDBBadge>
                            </td>
                            <td>{formatDateWithoutTime(inward.tdate)}</td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </MDBContainer>
    );
};

export default InwardTransactionView;
