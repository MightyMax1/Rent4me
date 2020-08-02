import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardGroup, Card, Button, Modal } from 'react-bootstrap';
import Api from '../Api';

const LessorItems = ({ user }) => {
    const [items, setItems] = useState(null);
    const [show, setShow] = useState(false);//MODAL review
    const [selectedItem, setSelectedItem] = useState({});// selected by  onClick Modal BTN

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function getItemsByLessorID() {
            const lessorID = user._id;
            const data = await Api.getItemsByLessorID(lessorID);
            setItems(data);
        }
        getItemsByLessorID();
    }, []);

    return (
        <Container>
            {console.log('my items:', items)}
            <CardGroup as={Row} className="pt-3" dir="rtl">
                {items && items.map((item) => {
                    return (
                        <Col xl={3} md={3} sm={6} xs={6} >
                            <Card className="p-2" key={item._id}>
                                <Card.Img variant="top" src={item.mainImg} />
                                <Card.Body className="text-center">
                                    <Card.Title>{item.title}</Card.Title>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button block>
                                        עריכת מוצר
                            </Button>
                                    <Button
                                        variant='danger'
                                        onClick={() => {
                                            setSelectedItem(item);
                                            handleShow();
                                        }}
                                        block>
                                        מחיקת מוצר
                            </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    );
                })}
            </CardGroup>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body dir="rtl" className='text-right'>
                    <h3>שם מוצר: {(selectedItem) ? selectedItem.title : ''}</h3>
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