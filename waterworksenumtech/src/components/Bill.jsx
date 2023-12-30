// import React, { useEffect, useState } from 'react';
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PDFFile from './PDF/PDFFile';
// import Swal from 'sweetalert2';
// const Bill = ({ setCollapsed }) => {
//     const [ state, setState ] = useState(false);
//     const [ currentMonth, setCurrentMonth ] = useState(new Date().getMinutes());
//     useEffect(() => {
//         setCollapsed(true);
//         const intervalId = setInterval(() => {
//             const newMonth = new Date().getMinutes();
//             if (newMonth !== currentMonth) {
//                 setCurrentMonth(newMonth);
//                 console.log(currentMonth);
//                 setState(true);
//             }
//         }, 1000); // Check every second, adjust as needed

//         return () => clearInterval(intervalId);
//     }, [ currentMonth ]);


//     const handleMonth = () => {
//         Swal.fire('Success', 'Bill Generated successfully', 'success');
//         setState(false);
//     };

//     return (
//         <div style={{ display: "grid", placeItems: "center" }}>
//             Bill
//             {state && <PDFDownloadLink document={<PDFFile />} filename="FORM">
//                 {({ loading }) => (loading ? <button className='btn btn-primary'>Loading Document...</button> : <button className='btn btn-profile-section'>Download</button>)}
//             </PDFDownloadLink>}
//             {/* {state && <PDFDownloadLink document={<PDFFile />} filename="FORM">
//                 {({ loading }) => (loading ? <button className='btn btn-primary'>Loading Document...</button> : <button className='btn btn-profile-section' onClick={handleMonth}>1 Month</button>)}
//             </PDFDownloadLink>} */}
//             {/* Swal.fire('Success', 'Zone added successfully', 'success'); */}
//             <button className='btn btn-profile-section' disabled={state} onClick={handleMonth}>1 Month</button>
//         </div>
//     );
// };

// export default Bill;
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFFile from './PDF/PDFFile';
import Swal from 'sweetalert2';

const Bill = ({ setCollapsed }) => {
    const [ state, setState ] = useState(false);
    const [ toggleButton, setToggleButton ] = useState(false);
    const [ currentMonth, setCurrentMonth ] = useState(new Date().getMinutes());
    const handleOneMonth = () => {
        Swal.fire('Success', 'Bill Generated successfully', 'success');
        setState(true);
        setToggleButton(false);
    };
    const handleDownload = () => {
        setState(!state);
        setToggleButton(!toggleButton);
    };

    useEffect(() => {
        setCollapsed(true);
        const intervalId = setInterval(() => {
            const newMonth = new Date().getMinutes();
            if (newMonth !== currentMonth) {
                setCurrentMonth(newMonth);
                console.log(currentMonth);
                setState(!state);
                setToggleButton(!toggleButton);
            }
        }, 1000); // Check every second, adjust as needed

        return () => clearInterval(intervalId);
    }, [ currentMonth ]);

    return (
        <div style={{ display: "grid", placeItems: "center" }}>
            Bill
            <button className='btn btn-black m-lg-5' disabled={toggleButton} onClick={handleOneMonth}>{!state ? "Generate Bill" : "Wait Till Next Month"}</button>
            <PDFDownloadLink document={<PDFFile />} fileName='1 Month Bill'>
                {({ loading }) => (loading ? <button className='btn btn-black'>Loading Document...</button> : <button className='btn btn-black' onClick={handleDownload}>DownLoad Document</button>)}
            </PDFDownloadLink>
        </div>
    );
};

export default Bill;