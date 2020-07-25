import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardGroup, Card, Button } from 'react-bootstrap';
import { differenceInCalendarDays, format } from 'date-fns';
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

const HistoryLessor = ({ user }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getOrdersByUserId() {
            //get all orders where userID == lessorID
            const userType = 'lessor';
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
                                    <Button>הודעה לשוכר</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    );
                })}
            </CardGroup>
        </Container>
    )
}

export default HistoryLessor;