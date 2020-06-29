import React, { useState } from 'react';
// NavLink - change url
import { Link } from 'react-router-dom';
import { Navbar, Nav, Col, Button, Modal, Form, Row } from 'react-bootstrap';

function MainNavbar(props) {

	//login modal (pop-up)
	const [show, setShow] = useState(false);

	//hadle close/open of login modal
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Navbar sticky="top" bg="light" expand="lg">
			<Col xl={2} md={2} sm={2} xs={2}>
				<Navbar.Brand as={Link} to="/">
					תשכיר לי
				</Navbar.Brand>
			</Col>

			<Col xl={{ span: 5, offset: 5 }} md={{ span: 4, offset: 6 }} sm={{ span: 2, offset: 8 }} xs={{ span: 3, offset: 7 }}>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav ">
					<Nav dir="rtl" className="mr-auto" >
						<Nav.Link as={Link} to="/">ראשי</Nav.Link>
						<Nav.Link as={Link} to="/private">איזור אישי</Nav.Link>
						<Nav.Link as={Link} to="/messages">הודעות</Nav.Link>
						<Nav.Link as={Link} to="/help">עזרה</Nav.Link>
						<Button variant="outline-primary" size="sm" onClick={handleShow}>התחבר</Button>
					</Nav>
				</Navbar.Collapse>
			</Col>

			{/******  modal login section ******/}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton  >
					<Modal.Title >התחבר לחשבונך</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form dir="rtl">
						<Form.Row>
							<Form.Label lg={2} md={2} column="sm">מייל</Form.Label>
							<Col>
								<Form.Control size="sm" type="email" placeholder="הכנס דואר אלקטרוני  " />
							</Col>
						</Form.Row>
						<Form.Row>
							<Form.Label lg={2} md={2} column="sm">סיסמה</Form.Label>
							<Col>
								<Form.Control size="sm" type="password" placeholder="הכנס סיסמה" />
							</Col>
						</Form.Row>
						<Form.Row>
							<Col className="p10" xl={{ span: 8, offset: 2 }} md={{ span: 8, offset: 2 }} xs={12}>
								<Button type="submit" name="login" variant="primary" size="sm" >התחבר</Button>
							</Col>
							<col xl={{ offset: 2 }} md={{ offset: 2 }}></col>
						</Form.Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button size="sm" variant="secondary" onClick={handleClose}>
						ליצור חשבון
          			</Button>

				</Modal.Footer>
			</Modal>
		</Navbar>



	);
}

export default MainNavbar;
