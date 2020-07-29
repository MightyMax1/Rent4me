import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardGroup, Card, Button, Modal, Form } from 'react-bootstrap';
import { differenceInCalendarDays, format } from 'date-fns';
import Rating from 'react-rating'; // https://github.com/dreyescat/react-rating
import Api from '../Api';

const STATUSES = {
    NEW_BOOKING: 'NEW_BOOKING', //item just added
    CONFIRM_BOOKING: 'CONFIRM_BOOKING', // after lessor approve
    CONFIRM_ITEM_BY_LESSEE: 'CONFIRM_ITEM_BY_LESSEE', // after lessee received item
    CONFIRM_ITEM_BY_LESSOR: 'CONFIRM_ITEM_BY_LESSOR', // order finished (after lessor approve)
};

const hebrewText = {
    totalDays: 'סהכ ימים:',
    totalPrice: 'סהכ רווח',
    rentStart: 'תחילת שכירות',
    retnEnd: 'סיום שכירות',
    lessorName: 'שם שוכר',
    status: 'סטטוס',
    statusValue: {
        NEW_BOOKING: 'מחכה לאישור שלך',
        CONFIRM_BOOKING: 'מאושר'
    }
};

const HistoryLessee = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({});// selected by Modal onClick
    const [show, setShow] = useState(false);//MODAL review

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function getOrdersByUserId() {
            //get all orders where userID == lessorID
            const userType = 'lessee';
            const data = await Api.getOrdersByUserId(user._id, userType);
            console.log(`use effect , data:`, data)
            const orders = filterOrders(data);
            setOrders(orders);

        }

        getOrdersByUserId();
    }, []);

    const filterOrders = (orders) => {
        const filtredOrders = orders.filter(order => {
            return order.status == STATUSES.CONFIRM_ITEM_BY_LESSOR;
        })
        return filtredOrders;
    }

    const dateFormate = (date) => format(new Date(date), "dd-MM-yyyy HH:mm")


    return (
        <Container>
            <h3 className="text-center">היסטוריית הזמנות</h3>
            <CardGroup as={Row} className="pt-3" dir="rtl">
                {orders.map(order => {
                    return (
                        <Col xl={3} md={3} sm={6} xs={6} key={order._id}>
                            <Card className="p-2">
                                <Card.Img variant="top" src={order.itemDetails.img} />
                                <Card.Body className="text-right">
                                    <Card.Title>{order.itemDetails.title}</Card.Title>
                                    <p>{`${hebrewText.rentStart}: ${dateFormate(order.startRent)}`}</p>
                                    <p>{`${hebrewText.retnEnd}: ${dateFormate(order.endRent)}`}</p>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button onClick={() => {
                                        setSelectedOrder(order);
                                        handleShow();
                                    }}>
                                        השאר חוות דעת
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    );
                })}
            </CardGroup>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title >חוות דעת </Modal.Title>
                </Modal.Header>
                <Modal.Body dir="rtl">
                    <Rating
                        onChange={(rate) => console.log('rate is:', rate)}
                        emptySymbol={<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>}
                        fullSymbol={<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>}
                    />
                    <Form.Control placeholder="כתוב חוות דעת על המוצר ושירות המשכיר" as="textarea" rows="3" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" >
                        שלח
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default HistoryLessee;