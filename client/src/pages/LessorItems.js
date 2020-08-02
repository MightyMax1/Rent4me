import React, { useState } from 'react';
import { Container, Row, Col, CardGroup, Card, Button, Modal } from 'react-bootstrap';

const LessorItems = ({ user }) => {
    const [show, setShow] = useState(false);//MODAL review

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <CardGroup as={Row} className="pt-3" dir="rtl">
                <Col xl={3} md={3} sm={6} xs={6} >
                    <Card className="p-2">
                        <Card.Img variant="top" src='https://icon-library.com/images/img-icon/img-icon-24.jpg' />
                        <Card.Body className="text-center">
                            <Card.Title>title ttttitle </Card.Title>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button block>
                                עריכת מוצר
                            </Button>
                            <Button variant='danger' onClick={handleShow} block>
                                מחיקת מוצר
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xl={3} md={3} sm={6} xs={6} >
                    <Card className="p-2">
                        <Card.Img variant="top" src='https://icon-library.com/images/img-icon/img-icon-24.jpg' />
                        <Card.Body className="text-center">
                            <Card.Title>title ttttitle </Card.Title>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button block>
                                עריכת מוצר
                            </Button>
                            <Button variant='danger' onClick={handleShow} block>
                                מחיקת מוצר
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xl={3} md={3} sm={6} xs={6} >
                    <Card className="p-2">
                        <Card.Img variant="top" src='https://icon-library.com/images/img-icon/img-icon-24.jpg' />
                        <Card.Body className="text-center">
                            <Card.Title>title ttttitle </Card.Title>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button block>
                                עריכת מוצר
                            </Button>
                            <Button variant='danger' onClick={handleShow} block>
                                מחיקת מוצר
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </CardGroup>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body dir="rtl" className='text-right'>
                    <h3>שם מוצר: תותח פירורי שניצל</h3>
                    <p>בטוח שאתה רוצה למחוק מוצר זה?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Col>
                        <Button variant="danger" onClick={handleClose} block>
                            מחק
                    </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleClose} block>
                            בטל
                    </Button>
                    </Col>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default LessorItems;