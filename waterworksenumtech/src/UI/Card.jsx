import React from 'react';

const Card = ({ className, children }) => {
    return (
        <>
            <article className={`card_s ${className}`}>
                {children}
            </article>
        </>
    );
};

export default Card;
