import React, { useEffect, useState } from 'react';
import { Swal } from 'sweetalert2';
import LoaderComp from '../LoaderComp';
import { FaSearch } from 'react-icons/fa';
import { MDBBadge } from 'mdb-react-ui-kit';
import axios from 'axios';
import { data } from './Mock_data';
import Button from 'react-bootstrap/Button';
import signature from './signature.png';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function formatDateWithoutTime(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const InwardReports = ({ setCollapsed }) => {
    const [ inwardTrans, setInwardTrans ] = useState([]);
    const [ filterInward, setFilterInward ] = useState([]);
    const [ selectedFilter, setSelectedFilter ] = useState();
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ modalShow, setModalShow ] = useState(false);
    const [ singleEmployee, setSingleEmployee ] = useState([]);

    const [ date, setDate ] = useState({
        startDate: "",
        endDate: "",
    });
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setCollapsed(true);
        fetchInwardTrans();
    }, []);

    const fetchInwardTrans = async () => {
        // try {
        //     setLoading(true);
        //     Swal.isLoading();
        //     const response = await axios.get(
        //         "http://localhost:8090/waterwork/get/getAllInwardTrans"
        //     );
        //     console.log(response.data);
        //     setInwardTrans(response.data);
        //     setFilterInward(response.data); // Set filteredoutwardTranss initially with all data
        //     Swal.hideLoading();
        // } catch (error) {
        //     console.error("Error fetching inwardTrans data:", error);
        // } finally {
        //     setLoading(false);
        // }
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

    const filterOptions = [ "By Tid", "By Sid", "By Receipt No." ];


    const handleDateEvent = (event) => {
        setDate({
            ...date,
            [ event.target.name ]: event.target.value,
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
        const sortedData = [ ...filterInward ].sort(
            (a, b) => b.tamount - a.tamount
        );
        setFilterInward(sortedData);
    };

    const handleSortLowToHigh = () => {
        const sortedData = [ ...filterInward ].sort(
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


    const handleDownload = async () => {
        const doc = new jsPDF({ orientation: 'landscape' });
        doc.addImage('https://png.pngtree.com/png-clipart/20220125/ourmid/pngtree-liquid-water-drop-splash-three-dimensional-decoration-png-image_4361854.png', 'PNG', 80, 0, 150, 50);
        doc.setFontSize(50);
        doc.text("Invoice", 150, 60, { align: "center" });
        doc.autoTable({
            margin: { top: 70, left: 20 },
            html: '#employee-table',
        });
        doc.setFontSize(20);
        doc.text("Authorized Signature", 50, 150);
        doc.addImage(signature, 50, 160, 50, 50);
        doc.save(`bill`);
    };

    return (
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
                            <div className="date">
                                <label htmlFor="from">From</label>
                                <input type="date" name="startDate" id="from" onChange={handleDateEvent} />
                                <label htmlFor="to">To</label>
                                <input type="date" name="endDate" id="to" onChange={handleDateEvent} />
                                <span className="h4"><FaSearch onClick={handleFilterDate} /></span>
                            </div>
                            <div>
                                <Button variant="primary" onClick={handleDownload}>
                                    Show Bill
                                </Button>
                            </div>
                        </div>
                        <table className="datatable">
                            <thead>
                                <tr>
                                    <th>Inward Tid</th>
                                    <th>Inward Sid</th>
                                    <th>Receipt No.</th>
                                    <th>Amount</th>
                                    <th>Transaction Date</th>
                                    <th>Bill</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((inward) => (
                                    <tr key={inward.inwardTid}>
                                        <td>{inward.inwardTid}</td>
                                        <td><img
                                            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                            alt={`Avatar`}
                                            style={{ width: "45px", height: "45px" }}
                                            className="rounded-circle"
                                        /></td>
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
                </form>
            </div>
        </>
    );
};

export default InwardReports;