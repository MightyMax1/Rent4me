import React from 'react';
// NavLink - change url
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function MainNavbar(props) {
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand as={Link} to="/">תשכיר לי </Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={Link} to="/">ראשי</Nav.Link>
					<Nav.Link as={Link} to="/private">איזור אישי</Nav.Link>
					<Nav.Link as={Link} to="/messages">הודעות</Nav.Link>
					<Nav.Link as={Link} to="/help">עזרה</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>


	);
}

export default MainNavbar;
