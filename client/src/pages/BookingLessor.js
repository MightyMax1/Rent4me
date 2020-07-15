import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardGroup, Card, Button, Modal } from 'react-bootstrap';

const BookingLessor = ({ user }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		async function getOrdersByUserId() {
			try {
				const res = await fetch(`http://localhost:4000/products/ordersByUserId?id=${user._id}`);
				const orders = await res.json();
				console.log('orders', orders);
			} catch (err) {
				console.log('getOrdersByUserId', err.message);
			}
		}

		getOrdersByUserId();
	}, []);

	return (
		<Container>
			<h3 className="text-center">אישור הזמנות</h3>

			<CardGroup as={Row} className="pt-3" dir="rtl">
				<Col xl={3} md={3} sm={6} xs={6}>
					<Card className="p-2" border="danger">
						<Card.Img variant="top" src="https://icon-library.com/images/img-icon/img-icon-14.jpg" />
						<Card.Body className="text-right">
							<Card.Title>בקבוק בלי פקק1</Card.Title>
							<p>התחלה: 18/7/20 17:30</p>
							<p>סיום: 01/8/20 10:00</p>
							<p>סטטוס: לא מאושר</p>
						</Card.Body>
						<Card.Footer className="text-center">
							<Button variant="primary" onClick={handleShow}>
								לאישור ופרטים נוספים
							</Button>
						</Card.Footer>
					</Card>
				</Col>
				<Col xl={3} md={3} sm={6} xs={6}>
					<Card className="p-2" border="success ">
						<Card.Img variant="top" src="https://icon-library.com/images/img-icon/img-icon-14.jpg" />
						<Card.Body className="text-right">
							<Card.Title>בקבוק בלי פקק2</Card.Title>
							<p>התחלה: 18/7/20 17:30</p>
							<p>סיום: 01/8/20 10:00</p>
							<p>סטטוס: מאושר</p>
						</Card.Body>
						<Card.Footer className="text-center">
							<Button variant="primary" onClick={handleShow}>
								לאישור ופרטים נוספים
							</Button>
						</Card.Footer>
					</Card>
				</Col>
				<Col xl={3} md={3} sm={6} xs={6}>
					<Card className="p-2" border="success ">
						<Card.Img variant="top" src="https://icon-library.com/images/img-icon/img-icon-14.jpg" />
						<Card.Body className="text-right">
							<Card.Title>בקבוק בלי פקק3</Card.Title>
							<p>התחלה: 18/7/20 17:30</p>
							<p>סיום: 01/8/20 10:00</p>
							<p>סטטוס: מאושר</p>
						</Card.Body>
						<Card.Footer className="text-center">
							<Button variant="primary" onClick={handleShow}>
								לאישור ופרטים נוספים
							</Button>
						</Card.Footer>
					</Card>
				</Col>
			</CardGroup>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>בקבוק בלי פקק1</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-right">
					<p>סה"כ זמן: 10 יום </p>
					<p>סה"כ רווח: 230 ש"ח</p>
					<p>שם שוכר: יובל דיין</p>
					<Button variant="secondary" onClick={handleClose}>
						הודעה לשוכר
					</Button>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						בטל הזמנה
					</Button>
					<Button variant="success" onClick={handleClose}>
						אשר הזמנה
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default BookingLessor;
