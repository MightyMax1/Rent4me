import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Form, FormGroup, FormLabel, Image } from 'react-bootstrap';

const toBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

function Register({ onLogin }) {

    const [form, setForm] = useState({});
    const history = useHistory();

    async function onChange(e) {
        const { name, value, files } = e.target;

        // handle img  file input
        if (name == 'profilepPic') {

            let newImages = '';
            if (files) {
                // console.log(files)
                //  convert it to base64
                newImages = await toBase64(files[0]);
            }
            //preview img
            const showImgSection = document.querySelector('#profileImg');
            showImgSection.classList.remove('invisible');
            // update state with new files of base64
            return setForm({ ...form, [name]: newImages });
        }

        // handle other  input's
        setForm({ ...form, [name]: value });
        console.log(form)
    }

    async function onSubmit(e) {
        e.preventDefault();
        console.log('form deliverd')
        console.log('form:', form);

        // send request to server register new user
        const res = await fetch('http://localhost:4000/auth/signup', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        //respon from server
        const data = await res.json();
        console.log("from server", data)

        // save token local storage for next api calls
        localStorage.setItem('token', data.token);
        // update use state in App Component
        onLogin(data.user);

        // redirect to homePage 
        history.push("/");
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
                            <Form.Control size="sm" type="text" name="lastName" placeholder="הכנס שם משפחה" minlength="2" required />
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
                    <FormGroup as={Row} className="image">
                        <FormLabel>הוסף תמונת פרופיל</FormLabel>
                        <Form.File name="profilepPic" />
                    </FormGroup>
                    <Row className="justify-content-center invisible" id="profileImg">
                        <Image width="170" height="180" src={form.profilepPic} alt="prev" roundedCircle />
                    </Row>

                    <Button type="submit" variant="primary" size="md" block>
                        הרשם
					</Button>
                </Container>

            </Form>
        </Container>
    );
};

export default Register;
