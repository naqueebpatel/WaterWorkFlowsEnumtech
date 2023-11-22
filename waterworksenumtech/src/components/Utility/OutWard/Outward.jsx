import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import OutwardSources from './OutWardSources';
const Outward = ({ setCollapsed }) => {
    useEffect(() => {
        setCollapsed(true);
    }, []);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    return (
        <div>
            <Button variant="primary" className='mx-auto w-auto d-block' style={{ position: "relative", top: "10px" }} onClick={() => setIsModalOpen(true)}>
                Add Details
            </Button>
            <OutwardSources
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Outward;