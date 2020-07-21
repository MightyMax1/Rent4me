import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Button, Alert, Container } from 'react-bootstrap';

const Lessee = () => {


	return (
		<Container>
			<Alert variant="primary" className="text-right">
				הזמנות עתידיות
				<Alert.Link as={Link} to="/private/lessee/booking">
					{' '}
					לחץ כאן{' '}
				</Alert.Link>
			</Alert>
			<Alert variant="primary" className="text-right">
				מוצרים בהשכרה כרגע
				<Alert.Link as={Link} to="/private/lessee/current_rent">
					{' '}
					לחץ כאן{' '}
				</Alert.Link>
			</Alert>
			<Alert variant="primary" className="text-right">
				היסטוריית הזמנות
				<Alert.Link as={Link} to="/private/lessee/history">
					{' '}
					לחץ כאן{' '}
				</Alert.Link>
			</Alert>
		</Container>

	);
};

export default Lessee;
