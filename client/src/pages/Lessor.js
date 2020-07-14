import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Alert, Container } from 'react-bootstrap';

const Lessor = () => {
    return (
        <Container>

            <Row className="align-center mb-3">
                <Button as={Col} xl={{ span: "4", offset: "2" }} md={{ span: "4", offset: "2" }} className="mt-1">
                    עריכת מוצר
			</Button>
                <Button as={Col} xl={{ span: "4", offset: "1" }} md={{ span: "4", offset: "1" }} className=" mt-1">
                    הוסף מוצר
			</Button>
            </Row>

            <Alert variant='primary' className="text-right">
                אישור הזמנות עתידיות
                <Alert.Link as={Link} to="/private/lessor/booking">{' '}לחץ כאן </Alert.Link>
            </Alert>
            <Alert variant='primary' className="text-right">
                מוצרים בהשכרה כרגע
                <Alert.Link as={Link} to="/private/lessor/current_rent">{' '}לחץ כאן </Alert.Link>
            </Alert>
            <Alert variant='primary' className="text-right">
                היסטוריית הזמנות
                <Alert.Link as={Link} to="/private/lessor/history">{' '}לחץ כאן </Alert.Link>
            </Alert>

        </Container>
    );
};

export default Lessor;
