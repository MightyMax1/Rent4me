import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardGroup, Card, Button, Modal } from 'react-bootstrap';

import { differenceInCalendarDays } from 'date-fns';

import Api from '../Api';

const r = {
	totalDays: 'סהכ ימים:',
};

const STATUSES = {
	NEW_BOOKING: 'NEW_BOOKING', //item just added
	CONFIRM_BOOKING: 'CONFIRM_BOOKING', // after lessor approve
	CONFIRM_ITEM_BY_LESSEE: 'CONFIRM_ITEM_BY_LESSEE', // after lessee received item
	CONFIRM_ITEM_BY_LESSOR: 'CONFIRM_ITEM_BY_LESSOR', // order finished (after lessor approve)
};

const BookingLessor = ({ user }) => {
	const [show, setShow] = useState(false);
	const [orders, setOrders] = useState([]);

	const [selectedOrder, setSelectedOrder] = useState({});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const approveOrder = async () => {
		const data = await Api.approveBooking(selectedOrder._id);
		if (data.err) {
			// handle error
		}
		setOrders(data);
		handleClose();
	};

	useEffect(() => {
		async function getOrdersByUserId() {
			const data = await Api.getOrdersByUserId(user._id);

			setOrders(data);
			console.log('orders', orders);
		}

		getOrdersByUserId();
	}, []);

	console.log('selectedOrder', selectedOrder);

	return (
		<Container>
			<h3 className="text-center">אישור הזמנות</h3>

			<CardGroup as={Row} className="pt-3" dir="rtl">
				{orders.map(order => {
					const borders = {
						NEW_BOOKING: 'danger',
						CONFIRM_BOOKING: 'success',
					};
					const borderColor = borders[order.status];
					return (
						<Col xl={3} md={3} sm={6} xs={6} key={order._id}>
							<Card className="p-2" border={borderColor}>
								<Card.Img variant="top" src="https://icon-library.com/images/img-icon/img-icon-14.jpg" />
								<Card.Body className="text-right">
									<Card.Title>בקבוק בלי פקק1</Card.Title>
									<p>התחלה: 18/7/20 17:30</p>
									<p>סיום: 01/8/20 10:00</p>
									<p>סטטוס: לא מאושר</p>
								</Card.Body>
								<Card.Footer className="text-center">
									<Button
										variant="primary"
										onClick={() => {
											setSelectedOrder(order);
											handleShow();
										}}>
										לאישור ופרטים נוספים
									</Button>
								</Card.Footer>
							</Card>
						</Col>
					);
				})}
			</CardGroup>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>בקבוק בלי פקק1</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-right">
					<p>
						{r.totalDays}
						{differenceInCalendarDays(new Date(selectedOrder.startRent), new Date(selectedOrder.endRent))}
					</p>
					<p>earn: {selectedOrder.totalPrice}</p>
					<p>שם שוכר: יובל דיין</p>
					<Button variant="secondary" onClick={handleClose}>
						הודעה לשוכר
					</Button>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						בטל הזמנה
					</Button>
					<Button variant="success" onClick={approveOrder}>
						אשר הזמנה
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default BookingLessor;
