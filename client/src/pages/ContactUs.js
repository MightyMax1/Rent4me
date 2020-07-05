import React from 'react'
import { marginTop } from 'react-router-dom';
import {Container, Row, Badge, Col, Form, Button} from 'react-bootstrap';

function ContactUs(props){

    return(
        <Container dir="rtl">
            <Row style={{ marginTop: '1%' }}>
					<Badge as={Col} variant="dark" className={'text-center'} style={{ fontSize: 'medium' }}>
						טופס יצירת קשר
					</Badge>
			</Row>
            <Form>
                <Form.Group className="text-right" controlId="exampleForm.ControlInput1">
                    <Form.Label>שם מלא</Form.Label>
                    <Form.Control type="name" placeholder="שם מלא" />
                </Form.Group>
                <Form.Group className="text-right" controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-right">כתובת דוא"ל</Form.Label>
                    <Form.Control type="email" placeholder="כתובת דואר אלקטרוני ליצירת קשר" />
                </Form.Group>
                <Form.Group className="text-right" controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-right">נושא</Form.Label>
                    <Form.Control type="subject" placeholder="נושא הפנייה" />
                </Form.Group>
                <Form.Group className="text-right" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="text-right">תוכן הפנייה</Form.Label>
                    <Form.Control as="textarea" rows="5" />
                </Form.Group>
            </Form>
            <Button variant="outline-primary">שלח</Button>{' '}
        </Container>
    )

}
export default ContactUs;