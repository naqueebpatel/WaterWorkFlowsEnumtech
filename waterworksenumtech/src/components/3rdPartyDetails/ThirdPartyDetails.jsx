import React, { useState } from 'react';
import ThirdPartyCard from './ThirdPartyCard';
import './thirdparty.css';
import ThirdPartyModal from './ThirdPartyModal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
const ThirdPartyDetails = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    return (
        <>
            <div className="mt-3">
                <Button variant="primary" className='mx-auto w-auto d-block' onClick={() => setIsModalOpen(true)}>
                    Add Details
                </Button>
            </div>
            <ThirdPartyModal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
            <Row className='space mt-3'>             {/* Add Custom Class */}
                {
                    [ 0, 1, 2, 3, 4, 5, 6, 7 ].map((value, index) => {
                        return (
                            <ThirdPartyCard key={index} />
                        );
                    })
                }
            </Row>


        </>
    );
};

export default ThirdPartyDetails;