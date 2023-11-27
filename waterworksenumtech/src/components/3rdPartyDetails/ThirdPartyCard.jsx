import ListGroup from 'react-bootstrap/ListGroup';
import { IoMdMailUnread } from "react-icons/io";
import { MdPhone } from "react-icons/md";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
function ThirdPartyCard() {
    return (
        <div className='profile-card'>
            <section className="mx-auto profile-section">

                <div className="card testimonial-card mt-2 mb-3">
                    <div className="card-up aqua-gradient"></div>
                    <div className="avatar mx-auto white">
                        <img src="https://static.fotor.com/app/features/img/aiface/advance/2.png" className="rounded-circle img-fluid"
                            alt="woman avatar" />
                    </div>
                    <div className="card-body text-center">
                        <h4 className="card-title font-weight-bold">Faizan Khan</h4>
                        <hr />
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item className='text-nowrap'> <IoMdMailUnread style={{
                                marginRight: "2.3dvh",
                                fontSize: "1.5rem"
                            }} />faizanKhan9309@gmail.com</ListGroup.Item>
                            <ListGroup.Item><MdPhone style={{
                                marginRight: "2.3dvh",
                                fontSize: "1.5rem"
                            }} />Mobile No:- &nbsp; 9665228837</ListGroup.Item>
                            <ListGroup.Item><PiSuitcaseSimpleFill style={{
                                marginRight: "2.3dvh",
                                fontSize: "1.5rem"
                            }} />Profession :- &nbsp; Programmer</ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
                <div className="glow-wrap">
                    <i className="glow"></i>
                </div>
            </section>
        </div>
    );
}

export default ThirdPartyCard;