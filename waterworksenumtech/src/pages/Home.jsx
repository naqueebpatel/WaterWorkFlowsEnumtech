import React from 'react';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Footer from '../components/Footer';
import Blog from './Blog';

const Home = () =>
{
    return (
        <>
            <AboutUs />
            <ContactUs />
            <Blog />
            <Footer />
        </>
    );
};

export default Home;