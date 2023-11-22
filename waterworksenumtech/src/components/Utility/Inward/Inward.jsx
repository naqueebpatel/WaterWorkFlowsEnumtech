import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InwardSources from './InwardSources';
const Inward = ({ setCollapsed }) => {
    useEffect(() => {
        setCollapsed(true);
    }, []);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    return (
        <div>
            <Button variant="primary" className='mx-auto w-auto d-block' style={{ position: "relative", top: "10px" }} onClick={() => setIsModalOpen(true)}>
                Add Details
            </Button>
            <InwardSources
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Inward;