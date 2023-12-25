import React, { useState } from 'react';
import SectionHead from './SectionHead.jsx';
import { ImQuotesLeft } from 'react-icons/im';
import Card from '../UI/Card.jsx';
import { testimonials } from '../components/SlidebarData';
import '../styles/blog.css';
const Blog = () => {
    const [ index, setIndex ] = useState(0);
    const { name, quote, job, avatar } = testimonials[ index ];

    setTimeout(() => {
        setIndex(index + 1);
        if (index >= testimonials.length - 1) {
            setIndex(0);
        }
    }, 5000);
    return (
        <>
            <section className="testimonials" id='blog'>
                <div className="testimonials__container">
                    <SectionHead icon={<ImQuotesLeft />} title="Blog" className="testimonials__head" />
                    <Card className="testimonial">
                        <div className="testimonial__avatar">
                            <img src={avatar} alt="{name}" />
                        </div>
                        <p className="testimoni__quote">{quote}</p>
                        <h5>{name}</h5>
                        <small className="testimonial__title">{job}</small>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default Blog;
