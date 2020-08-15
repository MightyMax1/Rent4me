import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Carousel, Badge, Card, Image, Button, Alert, Modal, Form } from 'react-bootstrap';
import Api from '../Api';
import Rating from 'react-rating'; // https://github.com/dreyescat/react-rating

//date-time picker  https://github.com/YouCanBookMe/react-datetime
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
//set local *hebrew* format for date-time picker
import moment from 'moment';
import 'moment/locale/he';

import { differenceInCalendarDays, differenceInHours } from 'date-fns';

moment.locale('he');

const Item = ({ user }) => {
	const { id } = useParams();
	const history = useHistory();
	const [item, setItem] = useState({});
	const [lessor, setLessor] = useState({});
	const [index, setIndex] = useState(0); //Carousel
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [message, setMessage] = useState('');
	const [totalPrice, setTotalPrice] = useState(0);
	const [itemOrders, setItemOrders] = useState(0);
	const [totalLessorData, setTotalLessorData] = useState({});
	const [show, setShow] = useState(false); //show modal message

	//handle modal show/close
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const userExist = user ? true : false;
	const varientBtn = user ? 'primary' : 'dark';

	useEffect(() => {
		async function getReviews() {
			const data = await Api.getReviews(id);
			setReviews(data);
		};
		async function getItemDetails() {
			const data = await Api.getItemById(id);
			setItem(data.itemDetails);
			setLessor(data.lessor);
			setTotalLessorData({
				totalItems: data.totalItemsOwn,
				totalOrders: data.totalLessorOrders,
			});
		};

		async function getItemsOrders() {
			const data = await Api.getOrdersByItemId(id);
			setItemOrders(data);
			console.log('orders:', data)
		}

		getItemDetails();
		getReviews();
		getItemsOrders();
		window.scrollTo(0, 0); //scroll to top when page load
	}, []);

	//Carousel  handle
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	const onMessage = e => {
		const { value } = e.target;
		setMessage(value);
	};

	const sendMessage = e => {
		e.preventDefault();
		console.log('msg', message);
		console.log('user', user);
		console.log('lessor', lessor);
		// send message to server with socket
		window.socket.emit('MESSAGE', { user, message, receiver: lessor });
		handleClose();
	};

	function formatDate(date) {
		let d = new Date(date);
		d = d.toLocaleString('en-GB').slice(0, 10);
		return d;
	}

	function getValid(current) {
		const yesterday = Datetime.moment().subtract(1, 'day');
		return current.isAfter(yesterday);
	}

	function calculateTotalPrice() {
		if (endDate && startDate) {
			const hourDiffenece = differenceInHours(new Date(endDate), new Date(startDate));
			const dayDiffenece = differenceInCalendarDays(new Date(endDate), new Date(startDate));
			if (hourDiffenece < 24) {
				setTotalPrice(Number(item.priceHour) * hourDiffenece)
			} else {
				setTotalPrice(Number(item.priceDay) * dayDiffenece)
			}

		}
	}

	async function submitOrder() {
		//TODO: validate order dates  & user existesne
		try {
			const body = {
				user: user, //lessee
				startRent: startDate,
				endRent: endDate,
				item: item,
				lessor: lessor,
				totalPrice: totalPrice,
			};

			console.log('submitted order obj: ', body);

			const data = Api.addNewOrder(body);
			console.log('data order', data);

			history.push('/private/lessee');
		} catch (err) {
			console.log('fetch new order err: ', err.message);
		}
	}

	return (
		<Container>
			<Row className="my-2">
				<Badge as={Col} variant="dark" className={'text-center'} style={{ fontSize: 'large' }}>
					{item.title}
				</Badge>
			</Row>
			<Row>
				<Col xl={4} md={4}>
					<Card bg="light">
						<Card.Header className="text-center">
							<Image src={lessor.profilepPic} roundedCircle />
						</Card.Header>
						<Card.Body className="text-center">
							<Card.Title>
								{lessor.firstName} {lessor.lastName}{' '}
							</Card.Title>
							<Card.Text>
								<p>סה"כ מוצרים: {totalLessorData.totalItems}</p>
								<p>סה"כ עסקאות: {totalLessorData.totalOrders}</p>
								<p>משתמש פעיל מתאריך {formatDate(lessor.createdAt)}</p>
							</Card.Text>
							<Button variant={varientBtn} size="md" disabled={!userExist} onClick={handleShow} block>
								שלח הודעה
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={8} md={8}>
					<Carousel activeIndex={index} onSelect={handleSelect}>
						{item.images &&
							item.images.map(img => {
								return (
									<Carousel.Item>
										<img src={img} style={{ maxHeight: '350px', width: '100%' }} />
									</Carousel.Item>
								);
							})}
					</Carousel>
				</Col>
			</Row>
			<Row dir="rtl">
				<Card as={Col} xl={5} md={5} border="info" className="ml-1 mt-1">
					<Card.Header className="text-right">תיאור מוצר</Card.Header>
					<Card.Body className="text-right">{item.description}</Card.Body>
				</Card>
				<Card as={Col} xl={3} md={3} border="info" className="ml-1 mt-1">
					<Card.Header className="text-right">מחירים</Card.Header>
					<Card.Body className="text-right">
						<Alert variant="info" className="text-center">
							מחיר לפי שעה: {item.priceHour}&#x20aa;
						</Alert>
						<Alert variant="info" className="text-center">
							מחיר לפי יום: {item.priceDay}&#x20aa;
						</Alert>
					</Card.Body>
				</Card>
				<Card as={Col} xl={3} md={3} border="info" className="ml-1 mt-1 d-none d-sm-block .d-sm-none .d-md-block">
					<Card.Header className="text-right">פרטים נוספים</Card.Header>
					<Card.Body className="text-right">
						<li>הושכר {itemOrders.length} פעמים</li>
						<li className="pt-3">סה"כ חוות דעת {reviews.length}</li>
					</Card.Body>
				</Card>
			</Row>

			<Row dir="rtl" className="pl-1">
				<Card as={Col} xl={12} md={12} border="info" className="mt-1">
					<Card.Header className="text-center">ביצוע הזמנה</Card.Header>
					<Card.Body className="text-center">
						<Row>
							<Col md={4} sm={12} xs={12}>
								<Card.Title>התחלה</Card.Title>
								<Datetime
									isValidDate={getValid}
									inputProps={{ name: 'startRent' }}
									onChange={e => setStartDate(e.format())}
									onBlur={calculateTotalPrice} />
							</Col>
							<Col md={4} sm={12} xs={12}>
								<Card.Title>סיום</Card.Title>
								<Datetime
									isValidDate={getValid}
									inputProps={{ name: 'endRent' }}
									onChange={e => setEndDate(e.format())}
									onBlur={calculateTotalPrice} />
							</Col>
							<Col md={4} sm={12} xs={12}>
								<h5>סה"כ</h5>
								<p> &#x20aa; {totalPrice} </p>
								<Button variant={varientBtn} disabled={!userExist} onClick={submitOrder} block>
									הזמן
								</Button>
							</Col>
						</Row>
						<Row className="pt-3 ">
							<Col md={{ span: '5', offset: '3' }} xs={12}></Col>
						</Row>
					</Card.Body>
				</Card>
			</Row>

			<h2 className="text-right mt-3">
				<Badge as={Col} variant="secondary" block>
					חוות דעת
				</Badge>
			</h2>
			{reviews && reviews.map((review) => {
				return (
					<Row dir="rtl" border="primary" className="mt-3">
						<Col xl={2} md={2} sm={5} xs={5}>
							<Image src={review.lessee.profileImg} thumbnail />
						</Col>
						<Card as={Col} key={review._id}>
							<Card.Header as={Row}>
								<Col sm={10} xs={10} className="text-right font-weight-bold">{review.lessee.fullName}</Col>

								<Col sm={10} xs={10} className="text-left font-weight-light text-muted">{formatDate(review.createdAt)}</Col>
							</Card.Header>
							<Card.Body>
								<Card.Text className="text-right">{review.review}</Card.Text>
							</Card.Body>
							<Card.Footer>
								<Rating
									readonly={true}
									initialRating={review.itemRate}
									emptySymbol={<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
									</svg>}
									fullSymbol={<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
									</svg>}
								/>
							</Card.Footer>
						</Card>
					</Row>
				);
			})}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>הודעה לשוכר</Modal.Title>
				</Modal.Header>
				<Modal.Body dir="rtl">
					<Form.Control as="textarea" rows="3" name="message" onChange={onMessage} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={sendMessage}>
						שלח הודעה
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Item;
