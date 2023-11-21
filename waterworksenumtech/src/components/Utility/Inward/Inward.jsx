import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InwardSources from './InwardSources';
const Inward = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    return (
        <div>
            <div className="mt-3">
                <Button variant="primary" className='mx-auto w-auto d-block' onClick={() => setIsModalOpen(true)}>
                    Add Details
                </Button>
            </div>
            <InwardSources
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Inward;