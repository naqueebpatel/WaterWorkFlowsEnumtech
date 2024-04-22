import { Container, Row, Col, Image } from "react-bootstrap";
import '../styles/about.css';
import image from '../carousalImages/image3.jpeg';

const AboutUs = () =>
{
    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1>About Us</h1>
                        <p>
                            Welcome to our company! We are dedicated to providing top-quality products and services to our customers. Our team consists of highly skilled professionals who are passionate about what they do.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus leo at nunc aliquam, ut interdum nunc eleifend. Vestibulum vel lacus vitae libero dignissim consectetur.
                        </p>
                        <p>
                            Nulla facilisi. Vivamus maximus pharetra magna, non scelerisque lorem tristique eget. Aenean vel ipsum nec urna fringilla tristique.
                        </p>
                        <p>
                            Proin non mi pretium, accumsan metus non, rutrum nisi. In hac habitasse platea dictumst. Sed suscipit, dui non volutpat aliquet, lectus felis placerat odio, a cursus risus turpis et magna.
                        </p>
                        <p>
                            Nullam euismod sem in efficitur lacinia. Sed vehicula, quam at feugiat efficitur, tortor lectus ullamcorper mauris, vel ultricies ipsum mi in turpis.
                        </p>
                        <p>
                            Fusce suscipit auctor augue, eget mattis metus ultricies vel. Duis semper nec lorem non lobortis. Nam nec sem et velit faucibus egestas eget eget justo.
                        </p>
                        <p>
                            Phasellus sit amet tempor purus. Morbi nec elit ut elit dignissim euismod.
                        </p>
                    </Col>
                    <Col md={ 4 }>
                        <Image src={ image } fluid />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AboutUs;