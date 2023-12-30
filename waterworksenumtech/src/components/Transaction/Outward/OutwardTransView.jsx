import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import LoaderComp from "../../LoaderComp";
import { MDBBadge } from "mdb-react-ui-kit";
import ReactPaginate from "react-paginate";

function formatDateWithoutTime(dateString) {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const OutwardTransView = ({ setCollapsed }) => {
  const [outwardTrans, setoutwardTrans] = useState([]);
  const [filterOutward, setFilterOutward] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const entriesPerPage = 10;

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

    switch (selectedFilter) {
      // diffrent value for filtering and diffrent value for searchterm
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

  const filterOptions = ["By Tid", "By Sid", "By Receipt No.", "By Paid To."];

  const handleDateEvent = (event) => {
    setDate({
      ...date,
      [event.target.name]: event.target.value,
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
    const sortedData = [...filterOutward].sort(
      (a, b) => b.outamount - a.outamount
    );
    setFilterOutward(sortedData);
  };

  const handleSortLowToHigh = () => {
    const sortedData = [...filterOutward].sort(
      (a, b) => a.outamount - b.outamount
    );
    setFilterOutward(sortedData);
  };

  const pagesVisited = pageNumber * entriesPerPage;

  const displayData = filterOutward
    .slice(pagesVisited, pagesVisited + entriesPerPage)
    .map((outward) => (
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
    ));

  const pageCount = Math.ceil(filterOutward.length / entriesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (loading) {
    return (
      <div>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <LoaderComp />
        </div>
        ;
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="datatable-container">
          <div className="header-tools">
            <div className="search">
              <input
                type="search"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <label className="label">
              <select
                value={selectedFilter || ""}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="" disabled>
                  Select Filter
                </option>
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option onClick={() => handleFilterChange("LOW to HIGHT")}>
                  LOW to HIGH
                </option>
                <option onClick={() => handleFilterChange("HIGH to LOW")}>
                  HIGH to LOW
                </option>
              </select>
            </label>
            <div className="date">
              <label htmlFor="from">From</label>
              <input
                type="date"
                name="startDate"
                id="from"
                onChange={handleDateEvent}
              />
              <label htmlFor="to">To</label>
              <input
                type="date"
                name="endDate"
                id="to"
                onChange={handleDateEvent}
              />
              <button
                className="btn btn-black"
                onClick={handleFilterDate}
              >
                Submit
              </button>
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
              {filterOutward.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No entries found.
                  </td>
                </tr>
              ) : (
                displayData
              )}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"btn btn-outline-secondary previousBttn"}
            nextLinkClassName={"btn btn-outline-secondary nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"customActivePage"}
          />

          <style jsx>{`
  .paginationBttns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .previousBttn,
  .nextBttn {
    border-radius: 25px;
  }

  .customActivePage {
    background: #000; /* Set to black */
    color: #fff;
    border-radius: 25px;
    padding: 8px 12px;
    font-weight: bold; /* Set to bold */
  }
`}</style>
        </div>
      </div>
    </>
  );
};

export default OutwardTransView;
