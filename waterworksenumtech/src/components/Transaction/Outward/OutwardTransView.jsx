import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import LoaderComp from "../../LoaderComp";
import { MDBBadge } from 'mdb-react-ui-kit';


function formatDateWithoutTime(dateString) {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const OutwardTransView = ({ setCollapsed }) => {
  const [ outwardTrans, setoutwardTrans ] = useState([]);
  const [ filterOutward, setFilterOutward ] = useState([]);
  const [ selectedFilter, setSelectedFilter ] = useState();
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ date, setDate ] = useState({
    startDate: "",
    endDate: "",
  });
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setCollapsed(true);
    fetchoutwardTransData();
  }, []);

  const fetchoutwardTransData = async () => {
    try {
      setLoading(true);
      Swal.isLoading();
      const response = await axios.get(
        "http://localhost:8090/waterwork/get/getAllOutwardTrans"
      );
      console.log(response.data);
      setoutwardTrans(response.data);
      setFilterOutward(response.data); // Set filteredoutwardTranss initially with all data
      Swal.hideLoading();
    } catch (error) {
      console.error("Error fetching outwardTrans data:", error);
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
      case "By Paid To.":
        handlePaidTo(value);
        break;
      case "By Receipt No.":
        handleFilterReceipt(value);
        break;
      // case "HIGH to LOW":
      //   handleSortHighToLow();
      //   break;
      // case "LOW to HIGH":
      //   handleSortLowToHigh()
      //   break;
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

  const filterOptions = [ "By Tid", "By Sid", "By Receipt No.", "By Paid To." ];


  const handleDateEvent = (event) => {
    setDate({
      ...date,
      [ event.target.name ]: event.target.value,
    });
  };

  const handleFilterTid = (value) => {
    const filteredData = outwardTrans.filter((outwardTrans) => {
      const tid = String(outwardTrans.outwardTid);
      return tid.includes(value);
    });
    setFilterOutward(filteredData);
  };

  const handleFilterSid = (value) => {
    const filteredData = outwardTrans.filter((outwardTrans) => {
      const sid = String(outwardTrans.outwardSid);
      return sid.includes(value);
    });
    setFilterOutward(filteredData);
  };

  const handlePaidTo = (value) => {
    const filteredData = outwardTrans.filter((outward) => {
      const paid = outward.paidto.toLowerCase();
      return paid.includes(value.toLowerCase());
    });
    console.log(filteredData);
    setFilterOutward(filteredData);
  };

  const handleFilterReceipt = (value) => {
    const filteredData = outwardTrans.filter((outward) => {
      const receiptNo = String(outward.voucherno);
      return receiptNo.includes(value);
    });
    setFilterOutward(filteredData);
  };

  const handleFilterDate = () => {
    const startDate = new Date(date.startDate);
    const endDate = new Date(date.endDate);

    const filteredData = outwardTrans.filter((outwardTrans) => {
      const transactionDate = new Date(outwardTrans.outtdate);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    setFilterOutward(filteredData);
  };

  const handleSortHighToLow = () => {
    const sortedData = [ ...filterOutward ].sort(
      (a, b) => b.outamount - a.outamount
    );
    setFilterOutward(sortedData);
  };

  const handleSortLowToHigh = () => {
    const sortedData = [ ...filterOutward ].sort(
      (a, b) => a.outamount - b.outamount
    );
    setFilterOutward(sortedData);
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
    // <MDBContainer
    //   style={{
    //     width: "83vw",
    //     position: "relative",
    //     top: "8vh",
    //     left: "8vw",
    //   }}
    // >
    //   {/* Search Bar and Filter Options with Margins */}

    //   <div className="mb-3 d-flex align-items-center">
    //     <MDBInput
    //       type="text"
    //       label="Search"
    //       value={searchTerm}
    //       onChange={handleSearch}
    //       className="mb-2 me-2 square-search text-white"
    //       style={{ marginRight: "8px" }}
    //     />

    //     {/* Add a gap between Search Button and Search Input */}
    //     <div style={{ marginRight: "8px" }}> </div>

    //     {/* Filter Dropdown */}
    //     <MDBDropdown className="custom-dropdown">
    //       <MDBDropdownToggle className="custom-dropdown-toggle">
    //         {selectedFilter || "Select Filter"}
    //       </MDBDropdownToggle>
    //       <MDBDropdownMenu className="custom-dropdown-menu">
    //         {/* Map through filter options to create dropdown items */}
    //         {filterOptions.map((option) => (
    //           <MDBDropdownItem
    //             key={option}
    //             onClick={() => handleFilterChange(option)}
    //           >
    //             {option}
    //           </MDBDropdownItem>
    //         ))}
    //         <MDBDropdownItem onClick={() => handleFilterChange("HIGH to LOW")}>
    //           HIGH to LOW
    //         </MDBDropdownItem>
    //         <MDBDropdownItem onClick={() => handleFilterChange("LOW to HIGH")}>
    //           LOW to HIGH
    //         </MDBDropdownItem>
    //       </MDBDropdownMenu>
    //     </MDBDropdown>
    //     <div className="date px-3 py-2 rounded">
    //       Date
    //       <div className="icon">
    //         <IoIosArrowUp />
    //       </div>
    //       <div className="date-input px-3 py-2 rounded text-white">
    //         <h5>From</h5>
    //         <input type="date" name="startDate" onChange={handleDateEvent} />
    //         <h5>To</h5>
    //         <input type="date" name="endDate" onChange={handleDateEvent} />
    //         <button className="btn btn-primary" onClick={handleFilterDate}>Search</button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* outwardTrans Table */}
    //   <MDBTable align="middle" className="table-bordered">
    //     <MDBTableHead>
    //       <tr className="table-success">
    //         <th scope="col">Outward Tid</th>
    //         <th scope="col">Outward Sid</th>
    //         <th scope="col">Receipt No.</th>
    //         <th scope="col">Amount</th>
    //         <th scope="col">Paid To</th>
    //         <th scope="col">Transaction Date</th>
    //       </tr>
    //     </MDBTableHead>
    //     <MDBTableBody>
    //       {/* Example outward data with added image property */}
    //       {filterOutward.map((outward) => (
    //         <tr key={outward.outwardTid} className="table-info">
    //           <td>{outward.outwardTid}</td>
    //           <td>
    //             <p className="fw-bold mb-1">{outward.outwardSid}</p>
    //           </td>
    //           <td>{outward.voucherno}</td>
    //           <td>
    //             <MDBBadge
    //               color={
    //                 outward.outamount >= 1000
    //                   ? "success"
    //                   : outward.outamount > 2000
    //                     ? "primary"
    //                     : outward.outamount < 500
    //                       ? "danger"
    //                       : "warning"
    //               }
    //               pill
    //             >
    //               ₹ {outward.outamount}
    //             </MDBBadge>
    //           </td>
    //           <td>{outward.paidto}</td>
    //           <td>{formatDateWithoutTime(outward.outtdate)}</td>
    //         </tr>
    //       ))}
    //     </MDBTableBody>
    //   </MDBTable>
    // </MDBContainer>
    <>
      <div>
        <form>
          <div className="datatable-container">
            <div className="header-tools">
              <div className="search">
                <input type="search" className="search-input" placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch} />
              </div>

              <button className="btn btn-black" onClick={handleFilterDate}>Submit</button>

              <label className="label">
                <select>
                  <option value="" selected disabled>Select Filter</option>
                  {filterOptions.map((option) => (
                    <option
                      key={option}
                      onClick={() => handleFilterChange(option)}
                    >
                      {option}
                    </option>
                  ))}
                  <option onClick={() => handleFilterChange("LOW to HIGHT")}>LOW to HIGH</option>
                  <option onClick={() => handleFilterChange("HIGH to LOW")}>HIGH to LOW</option>
                </select>
              </label>
              <div className="date">
                <input type="date" name="" id="" />
                <input type="date" name="" id="" />
              </div>
            </div>
            <table className="datatable">
              <thead>
                <tr>
                  <th>Outward Tid</th>
                  <th>Outward Sid</th>
                  <th>Receipt No.</th>
                  <th>Amount</th>
                  <th>Paid To</th>
                  <th>Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                {filterOutward.map((outward) => (
                  <tr key={outward.outwardTid} className="table-info">
                    <td>{outward.outwardTid}</td>
                    <td>
                      <p className="fw-bold mb-1">{outward.outwardSid}</p>
                    </td>
                    <td>{outward.voucherno}</td>
                    <td>
                      <MDBBadge
                        color={
                          outward.outamount >= 1000
                            ? "success"
                            : outward.outamount > 2000
                              ? "primary"
                              : outward.outamount < 500
                                ? "danger"
                                : "warning"
                        }
                        pill
                      >
                        ₹ {outward.outamount}
                      </MDBBadge>
                    </td>
                    <td>{outward.paidto}</td>
                    <td>{formatDateWithoutTime(outward.outtdate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
};

export default OutwardTransView;