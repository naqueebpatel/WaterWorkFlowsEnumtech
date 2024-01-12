import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import LoaderComp from "../../LoaderComp";
import './inwardTransactionView.css';
import { MDBBadge } from 'mdb-react-ui-kit';
import { FaSearch} from "react-icons/fa";
import signature from './signature.png';
import Button from "react-bootstrap/esm/Button";
import jsPDF from "jspdf";

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
    const [inwardData,setInwardData]=useState()
    const [date, setDate] = useState({
        startDate: "",
        endDate: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCollapsed(true);
        fetchInwardTrans();
        fetchInwardData();
    }, []);

    const fetchInwardData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:8090/waterwork/get/getAllInwardSource"
            );
            setInwardData(response.data); // Assuming data is an array of objects with zonename and zoneno attributes
        } catch (error) {
            console.error("Error fetching zone data:", error);
        } finally {
            setLoading(false);
        }
    };

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
            case "By Source":
                handleFilterSname(value);
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

    const filterOptions = ["By Tid", "By Source", "By Receipt No."];


    const handleDateEvent = (event) => {
        setDate({
            ...date,
            [event.target.name]: event.target.value,
        });
    };
    // console.log(typeof (new Date(date.startDate)));
    // console.log(new Date(date.endDate));

    const handleFilterTid = (value) => {
        const filteredData = inwardTrans.filter((inwardTrans) => {
            const tid = String(inwardTrans.inwardTid);
            return tid.includes(value);
        });
        setFilterInward(filteredData);
    };

    const handleFilterSname = (value) => {
            const filteredData = inwardTrans.filter((inward) => {
                const sourceName = inwardData?.find(
                    (data) => data.inwardSid === inward.inwardSid
                )?.inwardSname;
                return sourceName.toLowerCase().includes(value.toLowerCase());
            });
            setFilterInward(filteredData);
        }


    const handleFilterReceipt = (value) => {
        const filteredData = inwardTrans.filter((inward) => {
            const receiptNo = String(inward.receiptno);
            return receiptNo.includes(value);
        });
        setFilterInward(filteredData);
    };

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
        <>
            <div>
                {/* <form> */}
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
                                    <option onClick={() => handleFilterChange("LOW to HIGH")}>LOW to HIGH</option>
                                    <option onClick={() => handleFilterChange("HIGH to LOW")}>HIGH to LOW</option>
                                </select>
                            </label>
                            <div className="date">
                                <label htmlFor="from">From</label>
                                <input type="date" name="startDate" id="from" onChange={handleDateEvent} />
                                <label htmlFor="to">To</label>
                                <input type="date" name="endDate" id="to" onChange={handleDateEvent} />
                                <span className="h4"><FaSearch onClick={handleFilterDate} /></span>

                            </div>
        
                        </div>
                        <table className="datatable">
                            <thead>
                                <tr>
                                    <th>Inward Tid</th>
                                    <th>Inward Source</th>
                                    <th>Receipt No.</th>
                                    <th>Amount</th>
                                    <th>Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterInward.map((inward) => (
                                    <tr key={inward.inwardTid}>
                                        <td>{inward.inwardTid}</td>
                                        <td>{inwardData?.find(data => data.inwardSid === inward.inwardSid)?.inwardSname}</td>
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
                            </tbody>
                        </table>
                    </div>
                {/* </form> */}
            </div>
        </>
    );
};

export default InwardTransactionView;
