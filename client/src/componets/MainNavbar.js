import React, { useState } from 'react';
// NavLink - change url
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, Col, Button, Modal, Form, Badge } from 'react-bootstrap';

import Api from '../Api';

import io from 'socket.io-client';

// array of all link, every link have text, path and isPrivate(boolean if it private only logged in user can access )
const links = [
	{ text: 'ראשי', isPrivate: false, to: '/' },
	{ text: 'הודעות', isPrivate: true, to: '/messages' },
	{ text: 'איזור אישי', isPrivate: true, to: '/private' },
	{ text: 'עזרה', isPrivate: false, to: '/help' },
];

function MainNavbar({ onLogin, onLogout, user }) {
	//login modal (pop-up)
	const [show, setShow] = useState(false);
	const [form, setForm] = useState({});

	//handle close/open of login modal
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const ToggleLogin = () => {
		// if user exists -> log out
		if (user) return onLogout();

		// if user not  exists -> show modal login
		handleShow();
	};

	// create history instance
	const history = useHistory();
	const toRegister = () => {
		handleClose();
		history.push('/register');
	};

	const handleLogin = async event => {
		// login flow ->

		event.preventDefault();

		// call login api
		const data = await Api.login(form);
		localStorage.setItem('token', data.token);

		let baseUrl = 'localhost:4000';
		if (process.env.NODE_ENV === 'production') {
			baseUrl = 'glacial-cliffs-91994.herokuapp.com';
		}

		window.socket = io(`https://${baseUrl}?token=${data.token}`);
		window.socket.on('connect', () => {
			console.log('client id', window.socket.id);
		});

		window.socket.on('MESSAGE', data => {
			console.log('on Message', data);
		});

		// close modal
		handleClose();

		// save token local storage for next api calls
		localStorage.setItem('token', data.token);
		// update use state in App Component
		onLogin(data.user);
	};

	// on link clicked
	const handleLink = (event, link) => {
		// if user not logged and route is private prevent redirect and show login modal
		if (link.isPrivate && !user) {
			event.preventDefault();
			// show pop up
			handleShow();
		}
	};

	const onChange = event => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	return (
		<Navbar sticky="top" bg="light" expand="md">
			<Col xl={2} md={2} sm={2} xs={2}>
				<Navbar.Brand as={Link} to="/">
					<img src="/logo1.png" width="45" height="45" className="d-inline-block align-top" />
					{user ? (
						<Badge pill variant="light" className="pl-3 mt-2">
							שלום,{user.firstName}
						</Badge>
					) : (
							''
						)}
				</Navbar.Brand>
			</Col>
			<Col xl={{ span: 4, offset: 6 }} md={{ span: 5, offset: 5 }} sm={{ span: 2, offset: 8 }} xs={{ span: 3, offset: 7 }}>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav ">
					<Nav dir="rtl" className="mr-auto">
						{links.map(link => {
							return (
								<Nav.Link as={Link} to={link.to} onClick={e => handleLink(e, link)}>
									{link.text}
								</Nav.Link>
							);
						})}

						<Button variant={user ? 'outline-danger' : 'outline-primary'} size="sm" onClick={ToggleLogin}>
							{user ? 'התנתק' : 'התחבר'}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Col>

			{/******  modal login section ******/}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>התחבר לחשבונך</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form dir="rtl" onSubmit={handleLogin} onChange={onChange}>
						<Form.Row>
							<Form.Label lg={2} md={2} column="sm">
								מייל
							</Form.Label>
							<Col>
								<Form.Control size="sm" type="email" name="email" placeholder="הכנס דואר אלקטרוני  " />
							</Col>
						</Form.Row>
						<Form.Row>
							<Form.Label lg={2} md={2} column="sm">
								סיסמה
							</Form.Label>
							<Col>
								<Form.Control size="sm" type="password" name="password" placeholder="הכנס סיסמה" />
							</Col>
						</Form.Row>
						<Form.Row>
							<Col className="p10" xl={{ span: 8, offset: 2 }} md={{ span: 8, offset: 2 }} xs={12}>
								<Button type="submit" name="login" variant="primary" size="sm">
									התחבר
								</Button>
							</Col>
							<col xl={{ offset: 2 }} md={{ offset: 2 }}></col>
						</Form.Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={toRegister} size="sm" variant="secondary">
						ליצור חשבון
					</Button>
				</Modal.Footer>
			</Modal>
		</Navbar>
	);
}

export default MainNavbar;
