import { Col, Form, Row } from "react-bootstrap";

function StvoriNatjecanjeForm() {
    return (
        <Form>
            <Form.Group>
                <Form.FloatingLabel label='Naziv natjecanja'>
                    <Form.Control type='text' placeholder='' />
                </Form.FloatingLabel>
            </Form.Group>
            <br />
            <Form.Group>
                <Form.FloatingLabel label='Natjecatelji (odvojeni zarezom ili novim rektom)'>
                    <Form.Control as="textarea" placeholder='' style={{ height: '250px' }} />
                </Form.FloatingLabel>
            </Form.Group>
            <br />
            <Form.Group>
                <Row>
                    <Col>
                        <Form.FloatingLabel label='Pobjeda'>
                            <Form.Control type='number' placeholder='' min={0} step={0.1} />
                        </Form.FloatingLabel>
                    </Col>
                    <Col>
                        <Form.FloatingLabel label='Remi'>
                            <Form.Control type='number' placeholder='' min={0} step={0.1} />
                        </Form.FloatingLabel>
                    </Col>
                    <Col>
                        <Form.FloatingLabel label='Poraz'>
                            <Form.Control type='number' placeholder='' min={0} step={0.1} />
                        </Form.FloatingLabel>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
}

export default StvoriNatjecanjeForm;