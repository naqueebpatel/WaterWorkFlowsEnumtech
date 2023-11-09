import "../styles/ContactUs.css";
export default function ContactUs() {
    return (
        <section id="contact">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-8 mx-auto text-center">
                        <h6 className="contact-heading">CONTACT</h6>
                        <h1 >Get In Touch</h1>
                        <p>We're here to help and answer any Question you might have. we look forward to hearing from you
                            <span><i className="fas fa-smile"></i></span></p>
                    </div>
                </div>

                <form action="https://getform.io/f/8af40023-61f3-4dda-b042-c2d81b80f134" method="POST" className="row g-3 justify-content-center text-center">
                    <div className="col-md-3">
                        <input type="text" className="form-control" name="fname" placeholder="Full Name" />
                    </div>
                    <div className="col-md-3">
                        <input type="text" className="form-control" name="email" placeholder="E-mail" />
                    </div>
                    <div className="col-md-4">
                        <input type="number" className="form-control" name="contact" placeholder="Contact Number" />
                    </div>
                    <div className="col-md-10">
                        <input type="text" className="form-control" name="subject" placeholder="Subject" />
                    </div>
                    <div className="col-md-10">
                        <textarea name="message" id="" cols="30" rows="5" className="form-control"
                            placeholder="Message" />
                    </div>
                    <div className="col-md-10 d-grid gap-2" >
                        <button variant="primary" size="lg" className="btn btn-primary">Contact</button>
                    </div>
                </form>
            </div>
        </section>
    );
}