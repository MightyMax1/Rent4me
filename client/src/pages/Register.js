import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, FormLabel } from 'react-bootstrap';



const Register = () => {

    const [form, setForm] = useState({});

    async function onChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        console.log(`name ${name} | value ${value}`)
    }

    async function onSubmit(e) {
        e.preventDefault();
        console.log('form deliverd')
        console.log('form:', form);

    }

    return (
        <Container>
            <Form onChange={onChange} onSubmit={onSubmit} dir="rtl">

                <Container fluid={true} className={'border-right border-left px-5'} style={{ maxWidth: '430px' }}>
                    <Form.Row>
                        <FormGroup as={Col} className="text-center">
                            <FormLabel>שם פרטי:</FormLabel>
                            <Form.Control size="sm" type="text" name="firstName" placeholder="הכנס שם פרטי" minlength="2" required />
                        </FormGroup>
                        <FormGroup as={Col} className=" text-center">
                            <FormLabel >שם משפחה:</FormLabel>
                            <Form.Control size="sm" type="text" name="lastName" placeholder="הכנס שם מלא" minlength="2" required />
                        </FormGroup>
                    </Form.Row>
                    <FormGroup as={Row} className="text-right">
                        <FormLabel >דואר אלקטרוני:</FormLabel>
                        <Form.Control size="sm" type="email" name="email" placeholder="הכנס בקשה אימייל" required />
                    </FormGroup>
                    <FormGroup as={Row} className="text-right">
                        <FormLabel >סיסמא:</FormLabel>
                        <Form.Control size="sm" type="password" name="password" placeholder="הכנס סיסמא לאתר" required />
                    </FormGroup>
                    <FormGroup as={Row} className="text-right">
                        <FormLabel >מספר פלאפון:</FormLabel>
                        <Form.Control size="sm" type="tel" name="phone" pattern="[0-9]{3}-[0-9]{7}" placeholder="באופן הבאה 888-8888888" required />
                    </FormGroup>
                    <FormGroup as={Row} className="text-right">
                        <FormLabel >עיר מגורים</FormLabel>
                        <Form.Control size="sm" type="text" name="city" placeholder="הכנס שם יישוב " minlength="2" required />
                    </FormGroup>
                    <FormGroup as={Row} className="images">
                        <FormLabel>הוסף תמונת פרופיל</FormLabel>
                        <Form.File name="profilepPic" />
                    </FormGroup>


                    <Button type="submit" variant="primary" size="md" block>
                        הרשם
					</Button>
                </Container>

            </Form>
        </Container>
    );
};

export default Register;
