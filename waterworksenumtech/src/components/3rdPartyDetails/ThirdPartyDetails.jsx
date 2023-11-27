import React, { useEffect, useState } from 'react';
import ThirdPartyCard from './ThirdPartyCard';
import './thirdparty.css';
import ThirdPartyModal from './ThirdPartyModal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
const ThirdPartyDetails = ({ setCollapsed }) => {
    useEffect(() => {
        setCollapsed(true);
    }, []);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    return (
        <>
            <Button style={{ position: "relative", top: "10px" }} variant="primary" className='mx-auto w-auto d-block' onClick={() => setIsModalOpen(true)}>
                Add Details
            </Button>
            <ThirdPartyModal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
            <div className='space mt-5'>             {/* Space is Custom CSS Class */}
                {
                    [ 0, 1, 2, 3, 4, 5, 6, 7 ].map((value, index) => {
                        return (
                            <ThirdPartyCard key={index} />
                        );
                    })
                }
            </div>


        </>
    );
};

export default ThirdPartyDetails;