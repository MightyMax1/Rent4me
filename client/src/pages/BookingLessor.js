import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardGroup, Card, Button, Modal } from 'react-bootstrap';
import { differenceInCalendarDays, format } from 'date-fns';
import Api from '../Api';

//test lessor login detail:
//Shemar_Abshire89@hotmail.com
//123

const hebrewText = {
	totalDays: 'סהכ ימים:',
	totalPrice: 'סהכ רווח',
	rentStart: 'תחילת שכירות',
	retnEnd: 'סיום שכירות',
	lessorName: 'שם שוכר',
	status: 'סטטוס',
	statusValue: {
		NEW_BOOKING: 'לא מאושר',
		CONFIRM_BOOKING: 'מאושר'
	}
};

const STATUSES = {
	NEW_BOOKING: 'NEW_BOOKING', //item just added
	CONFIRM_BOOKING: 'CONFIRM_BOOKING', // after lessor approve
	CONFIRM_ITEM_BY_LESSEE: 'CONFIRM_ITEM_BY_LESSEE', // after lessee received item
	CONFIRM_ITEM_BY_LESSOR: 'CONFIRM_ITEM_BY_LESSOR', // order finished (after lessor approve)
};

const BookingLessor = ({ user }) => {
	const [orders, setOrders] = useState([]);
	const [show, setShow] = useState(false); // Modal toggle
	const [selectedOrder, setSelectedOrder] = useState({});// selected by Modal onClick

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const approveOrder = async () => {
		// update(approve) order and return all orders of user(lessor)
		const data = await Api.approveBooking(selectedOrder._id);
		if (data.err) {
			// handle error
		}
		console.log('updated order list:', data)
		setOrders(data);//ser orders with updated list
		handleClose();
	};

	useEffect(() => {
		async function getOrdersByUserId() {
			//get all orders where userID == lessorID
			const userType = 'lessor';
			const data = await Api.getOrdersByUserId(user._id, userType);
			setOrders(data);
			console.log('orders', orders);
		}

		getOrdersByUserId();
	}, []);

	const dateFormate = (date) => format(new Date(date), "dd-MM-yyyy HH:mm")

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
								<Card.Img variant="top" src={order.itemDetails.img} />
								<Card.Body className="text-right">
									<Card.Title>{order.itemDetails.title}</Card.Title>
									<p>{`${hebrewText.rentStart}: ${dateFormate(order.startRent)}`}</p>
									<p>{`${hebrewText.retnEnd}: ${dateFormate(order.endRent)}`}</p>
									<p>
										{`${hebrewText.status}: ${hebrewText.statusValue[order.status]}`}
									</p>
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
					<Modal.Title>
						{(selectedOrder.itemDetails) ? selectedOrder.itemDetails.title : ''}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-right">
					<p>
						{hebrewText.totalDays}
						{differenceInCalendarDays(new Date(selectedOrder.startRent), new Date(selectedOrder.endRent))}
					</p>
					<p>{`${hebrewText.totalPrice}: ${selectedOrder.totalPrice}`}</p>
					<p>{`${hebrewText.lessorName}: ${selectedOrder.lesseeFullName}`}</p>
					{/* TODO: message to lessee */}
					<Button variant="secondary" onClick={handleClose}>
						הודעה לשוכר
					</Button>
				</Modal.Body>
				<Modal.Footer>
					{/* TODO: delete order => message to lessee */}
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
