import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardGroup, Card, Button, Modal, Badge } from 'react-bootstrap';
import { differenceInCalendarDays, differenceInHours, format } from 'date-fns';
import Api from '../Api';

const STATUSES = {
    NEW_BOOKING: 'NEW_BOOKING', //item just added
    CONFIRM_BOOKING: 'CONFIRM_BOOKING', // after lessor approve
    CONFIRM_ITEM_BY_LESSEE: 'CONFIRM_ITEM_BY_LESSEE', // after lessee received item
    CONFIRM_ITEM_BY_LESSOR: 'CONFIRM_ITEM_BY_LESSOR', // order finished (after lessor approve)
};

const hebrewText = {
    totalRentTime: 'זמן השכרה: ',
    totalPrice: 'סהכ לתשלום',
    rentStart: 'תחילת שכירות',
    retnEnd: 'סיום שכירות',
    lessorName: 'שם משכיר',
    status: 'סטטוס',
    statusValue: {
        NEW_BOOKING: 'לא מאושר',
        CONFIRM_BOOKING: 'מאושר'
    }
};

const BookingLessee = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false); // Modal toggle
    const [selectedOrder, setSelectedOrder] = useState({});// selected by Modal onClick

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //confirm receving item 
    const confirmOrder = async (orderID) => {
        const userType = 'lessee';
        const data = await Api.confirmReceivingItem(orderID, userType);
        console.log(`confirmOrder, data:`, data)
        const orders = filterOrders(data);
        setOrders(orders);

    }

    useEffect(() => {
        async function getOrdersByUserId() {
            const userType = 'lessee';
            const data = await Api.getOrdersByUserId(user._id, userType);
            console.log(`use effect , data:`, data)
            const orders = filterOrders(data);
            setOrders(orders);
        }

        getOrdersByUserId();
    }, []);

    const dateFormate = (date) => format(new Date(date), "dd-MM-yyyy HH:mm")

    function getTotalTime(start, end) {
        const hourDiffenece = differenceInHours(new Date(end), new Date(start));
        const dayDiffenece = differenceInCalendarDays(new Date(end), new Date(start));
        if (hourDiffenece < 24) {
            return `שעות ${hourDiffenece}`
        } else {
            return ` ימים ${dayDiffenece}`
        }
    }

    const filterOrders = (orders) => {
        const filtredOrders = orders.filter(order => {
            return order.status == STATUSES.NEW_BOOKING || order.status == STATUSES.CONFIRM_BOOKING;
        })
        return filtredOrders;
    }

    return (
        <Container>
            <h3 className="text-center">הזמנות עתידיות</h3>
            <CardGroup as={Row} className="pt-3" dir="rtl">
                {orders.map(order => {
                    const borders = {
                        NEW_BOOKING: 'danger',
                        CONFIRM_BOOKING: 'success',
                    };
                    const variantByStatus = (order.status == STATUSES.NEW_BOOKING) ? "warning" : "success";
                    const borderColor = borders[order.status];
                    const disableConfirmBTN = (order.status == STATUSES.NEW_BOOKING) ? true : false;
                    return (
                        <Col xl={3} md={3} sm={6} xs={6} key={order._id}>
                            <Card className="p-2" border={borderColor}>
                                <Card.Img variant="top" src={order.itemDetails.img} />
                                <Card.Body className="text-right">
                                    <Card.Title>{order.itemDetails.title}</Card.Title>
                                    <p>{`${hebrewText.rentStart}: ${dateFormate(order.startRent)}`}</p>
                                    <p>{`${hebrewText.retnEnd}: ${dateFormate(order.endRent)}`}</p>
                                    <p>
                                        {`${hebrewText.status}:`}
                                        <Badge variant={variantByStatus}>{hebrewText.statusValue[order.status]}</Badge>
                                    </p>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button
                                        onClick={() => confirmOrder(order._id)}
                                        disabled={disableConfirmBTN}
                                        variant={variantByStatus}
                                        block >
                                        אישור קבלת מוצר
                                    </Button>
                                    <Button
                                        variant="info"
                                        block
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            handleShow();
                                        }}
                                    >
                                        פרטים ופעולות נוספות
									</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    );
                })}
            </CardGroup>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {(selectedOrder.itemDetails) ? selectedOrder.itemDetails.title : ''}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-right">
                    <p>
                        {hebrewText.totalRentTime}
                        {getTotalTime(new Date(selectedOrder.startRent), new Date(selectedOrder.endRent))}
                    </p>
                    <p>{`${hebrewText.totalPrice}: ${selectedOrder.totalPrice}`}</p>
                    <p>{`${hebrewText.lessorName}: ${selectedOrder.lesseeFullName}`}</p>
                    {/* TODO: message to lessee */}
                    <Button variant="secondary" onClick={handleClose}>
                        הודעה לשוכר
					</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        בטל הזמנה
					</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );

}

export default BookingLessee;
