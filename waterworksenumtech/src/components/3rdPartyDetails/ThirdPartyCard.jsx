import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ThirdPartyCard() {
    return (
        <Card style={{ width: '17rem' }}>
            <Card.Img variant="top" src="https://static.fotor.com/app/features/img/aiface/advance/2.png" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Faizan Khan
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>faizanKhan9309@gmail.com</ListGroup.Item>
                <ListGroup.Item>Mobile No:- &nbsp; 9665228837</ListGroup.Item>
                <ListGroup.Item>Profession :- &nbsp; Programmer</ListGroup.Item>
            </ListGroup>
            <div className="glow-wrap">
                <i className="glow"></i>
            </div>
        </Card>
    );
}

export default ThirdPartyCard;