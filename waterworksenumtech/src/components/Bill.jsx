import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const Bill = ({ setCollapsed }) => {
    const [ state, setState ] = useState(false);
    const [ currentMonth, setCurrentMonth ] = useState(new Date().getMinutes());
    useEffect(() => {
        setCollapsed(true);
        const intervalId = setInterval(() => {
            const newMonth = new Date().getMinutes();
            if (newMonth !== currentMonth) {
                setCurrentMonth(newMonth);
                console.log(currentMonth);
                setState(true);
            }
        }, 1000); // Check every second, adjust as needed

        return () => clearInterval(intervalId);
    }, [ currentMonth ]);


    const handleMonth = () => {
        Swal.fire('Success', 'Bill Generated successfully', 'success');
        setState(false);
    };

    return (
        <div style={{ display: "grid", placeItems: "center" }}>
            Bill
            <button className='btn btn-profile-section' disabled={state} onClick={handleMonth}>1 Month</button>
        </div>
    );
};

export default Bill;