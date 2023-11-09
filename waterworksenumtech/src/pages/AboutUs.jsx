import image1 from '../carousalImages/aventador_sv_coupe_s_03.jpg'
import image2 from '../carousalImages/halo-of-neon-ring-illuminated-in-the-stunning-landscape-of-yosemite.jpg'
import '../styles/about.css'

const AboutUs = () => {
    return (
        <section id="about">
            <h1 className='h1'>About Us</h1>
            <div className="about1">
                <div className="image">
                    <div className="images">
                    <img src={image1} alt="" />
                    <img src={image2} alt="" />
                    </div>
                    <div className="text">
                        <h6>Water Works System means the source of water supply and the water supply and distribution system of the Authority, including the plants, works, instrumentalities or parts thereof and appurtenances thereto, lands, easements, rights in land and water rights, rights-of-way, contract rights, franchises, approaches, connections, dams, reservoirs, water mains and pipe lines, utility installations, pumping stations and equipment, and any other property, real.</h6>
                    </div>
                    </div>

                </div>
        </section>



    );
};

export default AboutUs;