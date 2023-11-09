import image1 from '../carousalImages/aventador_sv_coupe_s_03.jpg';
import image2 from '../carousalImages/aventador_svj_s2.webp';
import '../styles/about.css';

const AboutUs = () => {
    return (
        <section id="about">
            <h1 className='h1 col-md-8 mx-auto text-center'>About Us</h1>
            <div className="content">
                <div className="images">
                    <img src={image1} alt="" />
                </div>
                <div className="text">
                    <h4>Water Works By Enumtech</h4>
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum aperiam inventore, aliquam alias cumque fuga modi velit ipsam accusamus quidem atque obcaecati molestiae ad hic blanditiis ab numquam quam provident possimus ratione, enim et voluptatibus ea. Repellat ipsam illum explicabo sequi nesciunt saepe a fuga, dicta dolorem! Quidem magnam ullam temporibus maxime, facilis voluptatibus dolore consectetur, tenetur pariatur reiciendis id cum. Nisi harum reprehenderit tempora perferendis, quasi nesciunt numquam. Quod, rerum corporis? Totam adipisci quae ducimus pariatur nobis, molestiae facere obcaecati aut beatae eligendi aliquid debitis cumque sapiente maxime cupiditate nemo soluta autem voluptatibus, placeat excepturi! Explicabo mollitia fugiat praesentium.</h6>
                </div>
            </div>
            <div className="content">
                <div className="text">
                    <h4>Employees</h4>
                    <div className="email">
                        <ul>
                            <li><a href='#'>faizankhan@gmail.com</a></li>
                            <li><a href='#'>farhanmaniyar@gmail.com</a></li>
                            <li><a href='#'>naqueebpatel@gmail.com</a></li>
                            <li><a href='#'>faisalshailk@gmail.com</a></li>
                            <li><a href='#'>umershaikh@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="images">
                    <img src={image2} alt="" />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;