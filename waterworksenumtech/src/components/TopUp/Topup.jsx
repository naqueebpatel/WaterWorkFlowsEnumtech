import React, { useEffect } from 'react';

const Topup = ({ setCollapsed }) => {
    useEffect(() => {
        setCollapsed(true);
    }, []);
    return (
        <div>
            Top Up
        </div>
    );
};

export default Topup;
