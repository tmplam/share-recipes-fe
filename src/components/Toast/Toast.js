import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Toast } from 'react-bootstrap';

function ToastMessage({ message }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Share recipe</strong>
                    <small>1 min ago</small>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>

            <Col xs={6}>
                <Button onClick={() => setShow(true)}>Show Toast</Button>
            </Col>
        </>
    );
}

export default ToastMessage;
