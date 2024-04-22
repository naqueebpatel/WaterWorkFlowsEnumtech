import "../styles/ContactUs.css";
export default function ContactUs ()
{
    return (
        // <section id="contact">
        //     <div className="container">
        //         <div className="row mb-5">
        //             <div className="col-md-8 mx-auto text-center">
        //                 <h6 className="contact-heading">CONTACT</h6>
        //                 <h1 >Get In Touch</h1>
        //                 <p>We're here to help and answer any Question you might have. we look forward to hearing from you
        //                     <span><i className="fas fa-smile"></i></span></p>
        //             </div>
        //         </div>

        //         <form action="https://getform.io/f/8af40023-61f3-4dda-b042-c2d81b80f134" method="POST" className="row g-3 justify-content-center text-center">
        //             <div className="col-md-3">
        //                 <input type="text" className="form-control" name="fname" placeholder="Full Name" />
        //             </div>
        //             <div className="col-md-3">
        //                 <input type="text" className="form-control" name="email" placeholder="E-mail" />
        //             </div>
        //             <div className="col-md-4">
        //                 <input type="number" className="form-control" name="contact" placeholder="Contact Number" />
        //             </div>
        //             <div className="col-md-10">
        //                 <input type="text" className="form-control" name="subject" placeholder="Subject" />
        //             </div>
        //             <div className="col-md-10">
        //                 <textarea name="message" id="" cols="30" rows="5" className="form-control"
        //                     placeholder="Message" />
        //             </div>
        //             <div className="col-md-10 d-grid gap-2" >
        //                 <button variant="primary" size="lg" className="btn btn-primary">Contact</button>
        //             </div>
        //         </form>
        //     </div>
        // </section>
        <>
            <div class="bg-info contact4 overflow-hiddedn position-relative">
                <div class="row no-gutters">
                    <div class="container">
                        <div class="col-lg-6 contact-box mb-4 mb-md-0">
                            <div class="">
                                <h1 class="title font-weight-light text-white mt-2">Contact Us</h1>
                                <form class="mt-3">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group mt-2">
                                                <input class="form-control text-white" type="text" placeholder="name" />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group mt-2">
                                                <input class="form-control text-white" type="email" placeholder="email address" />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group mt-2">
                                                <textarea class="form-control text-white" rows="3" placeholder="message"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 d-flex align-items-center mt-2">
                                            <button type="submit" class="btn bg-white text-inverse px-3 py-2"><span> Submit</span></button>
                                            <span class="ml-auto text-white align-self-center"><i class="icon-phone mr-2"></i>251 546 9442</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 right-image p-r-0">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1619902.0054433027!2d-122.68851282163044!3d37.534535608111824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2sin!4v1507725785789"
                            width="100%" height="538" frameborder="0" style={ { border: "0%" } } allowfullscreen data-aos="fade-left" data-aos-duration="3000"></iframe>
                    </div>
                </div>
            </div>
        </>
    );
}