import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Carousel, Badge, Card, Image, Button, Alert } from 'react-bootstrap';

//date-time picker  https://github.com/YouCanBookMe/react-datetime
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
//set local *hebrew* format for date-time picker
import moment from 'moment';
import 'moment/locale/he';

import { differenceInCalendarDays } from 'date-fns';

moment.locale('he');

const Item = ({ user }) => {
	const { id } = useParams();
	const history = useHistory();
	const [item, setItem] = useState({});
	const [lessor, setLessor] = useState({});
	const [index, setIndex] = useState(0); //Carousel
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	//Carousel  handle
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	// run after every render (by default)
	useEffect(() => {
		console.log('useEffect...');

		async function getItem() {
			const res = await fetch(`http://localhost:4000/products/item/${id}`);
			const data = await res.json();

			console.log('data', data);

			console.log('item data', data.itemDetails);
			setItem(data.itemDetails);
			setLessor(data.lessor);
		}
		getItem();
	}, []);

	function formatDate(date) {
		let d = new Date(date);
		d = d.toLocaleString('en-GB').slice(0, 10);
		return d;
	}

	function getValid(current) {
		const yesterday = Datetime.moment().subtract(1, 'day');
		return current.isAfter(yesterday);
	}

	async function submitOrder() {
		const dayDiffenece = differenceInCalendarDays(new Date(endDate), new Date(startDate));
		const totalPrice = dayDiffenece * Number(item.priceDay);

		try {
			const res = await fetch('http://localhost:4000/products/orderItem', {
				method: 'POST',
				body: JSON.stringify({
					user: user,
					startRent: startDate,
					endRent: endDate,
					item: item,
					lessor: lessor,
					totalPrice: totalPrice,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			console.log('data', data);
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
								<p>סה"כ מוצרים: 123</p>
								<p>סה"כ עסקאות: 123</p>
								<p>משתמש פעיל מתאריך {formatDate(lessor.registerAt)}</p>
							</Card.Text>
							<Button variant="primary" size="md" block>
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
						<li>הושכר X פעמים</li>
						<li className="pt-3">סה"כ חוות דעת X</li>
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
								<Datetime isValidDate={getValid} inputProps={{ name: 'startRent' }} onChange={e => setStartDate(e.format())} />
							</Col>
							<Col md={4} sm={12} xs={12}>
								<Card.Title>סיום</Card.Title>
								<Datetime isValidDate={getValid} inputProps={{ name: 'endRent' }} onChange={e => setEndDate(e.format())} />
							</Col>
							<Col md={4} sm={12} xs={12}>
								<h5>סה"כ</h5>
								<p> &#x20aa; 182 </p>
								<Button variant="primary" block onClick={submitOrder}>
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
			<Row dir="rtl" border="primary" className="mt-3">
				<Col xl={2} md={2} sm={5} xs={5}>
					<Image src="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png" thumbnail />
				</Col>
				<Card as={Col}>
					<Card.Header as={Row}>
						<Col className="text-right font-weight-bold"> מוחמד אבוקסיס</Col>
						<Col className="text-left font-weight-light text-muted"> 01.01.2020</Col>
					</Card.Header>
					<Card.Body>
						<Card.Text className="text-right">
							במוקדמות מונדיאל 1958 הייתה נבחרת ישראל בכדורגל על סף העפלה לטורניר ללא ששיחקה אפילו משחק אחד, לאחר שכל הנבחרות מולן
							הוגרלה סירבו לשחק נגדה. היא העפילה לסיבוב המוקדמות השני לאחר סירובה של טורקיה, ולסיבוב השלישי לאחר סירובן של
							אינדונזיה ומצרים. בסיבוב השלישי הייתה אמורה ישראל להתמודד מול סודאן, ובעקבות סירובה הייתה אמורה להעפיל אוטומטית
							למונדיאל בשוודיה. אולם, פיפ"א התנגדה לכך שנבחרת כלשהי תעפיל לטורניר ללא ששיחקה כלל במוקדמות, וקבעה כי ישראל תשחק נגד
							אחת מסגניות בתי המוקדמות של אופ"א
						</Card.Text>
					</Card.Body>
				</Card>
			</Row>
			<Row dir="rtl" border="primary" className="mt-3">
				<Col xl={2} md={2} sm={5} xs={5}>
					<Image src="https://static.thenounproject.com/png/2643420-200.png" thumbnail />
				</Col>
				<Card as={Col}>
					<Card.Header as={Row}>
						<Col className="text-right font-weight-bold"> אלי אן</Col>
						<Col className="text-left font-weight-light text-muted"> 01.01.2020</Col>
					</Card.Header>
					<Card.Body>
						<Card.Text className="text-right">
							על אף שארצות הברית ובריטניה לחמו זו בזו מספר פעמים, כאשר משתמשים במונח "הפלישה הבריטית", אין הכוונה לפלישה צבאית,
							אלא לגל סיבובי ההופעות של הביטלס, האבנים המתגלגלות, המי ולהקות בריטיות נוספות בארצות הברית, בשנות ה-60.
						</Card.Text>
					</Card.Body>
				</Card>
			</Row>
			<Row dir="rtl" border="primary" className="mt-3">
				<Col xl={2} md={2} sm={5} xs={5}>
					<Image
						src="https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-03/64/superhero-deadpool-comics-512.png"
						thumbnail
					/>
				</Col>
				<Card as={Col}>
					<Card.Header as={Row}>
						<Col className="text-right font-weight-bold">deadpool</Col>
						<Col className="text-left font-weight-light text-muted"> 01.01.2020</Col>
					</Card.Header>
					<Card.Body>
						<Card.Text className="text-right">
							על כפות המאזניים הנחת משקולת ברזל ומנגד ערימת נוצות. בשפי ובנחת הוספת והחסרת נוצות עד שהמאזניים מאוזנים למשעי. מיד
							לאחר מכן גנבת חללית אפולו, הטענת בה את המאזניים, המשקולת והנוצות, וטסת לירח. על קרקע הירח שוב ביצעת את המדידה. מה
							יראו המאזניים כעת?
						</Card.Text>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	);
};

export default Item;
