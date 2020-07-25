import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const MessagesList = ({ user }) => {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        console.log('use effect');
    }, [])


    return (
        <Container>
            <Card >
                <Card.Body as={Row} dir="rtl">
                    <Col md={2} sm={2} xs={2}>
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col md={{ span: 2, offset: 5 }} sm={3} xs={5} className="mt-2">
                        <Card.Title>full name</Card.Title>
                    </Col>
                    <Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
                        dateTime
                    </Col>
                </Card.Body>
            </Card>
            <Card border='info' >
                <Card.Body as={Row} dir="rtl">
                    <Col md={2} sm={2} xs={2}>
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col md={{ span: 2, offset: 5 }} sm={3} xs={5} className="mt-2">
                        <Card.Title>full name</Card.Title>
                    </Col>
                    <Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
                        dateTime
                    </Col>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body as={Row} dir="rtl">
                    <Col md={2} sm={2} xs={2}>
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col md={{ span: 2, offset: 5 }} sm={3} xs={5} className="mt-2">
                        <Card.Title>full name</Card.Title>
                    </Col>
                    <Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
                        dateTime
                    </Col>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body as={Row} dir="rtl">
                    <Col md={2} sm={2} xs={2}>
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col md={{ span: 2, offset: 5 }} sm={3} xs={5} className="mt-2">
                        <Card.Title>full name</Card.Title>
                    </Col>
                    <Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
                        dateTime
                    </Col>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body as={Row} dir="rtl">
                    <Col md={2} sm={2} xs={2}>
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col md={{ span: 2, offset: 5 }} sm={3} xs={5} className="mt-2">
                        <Card.Title>full name</Card.Title>
                    </Col>
                    <Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
                        dateTime
                    </Col>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body as={Row} dir="rtl">
                    <Col md={2} sm={2} xs={2}>
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col md={{ span: 2, offset: 5 }} sm={3} xs={5} className="mt-2">
                        <Card.Title>full name</Card.Title>
                    </Col>
                    <Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
                        dateTime
                    </Col>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body as={Row} dir="rtl">
                    <Col md={2} sm={2} xs={2}>
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col md={{ span: 2, offset: 5 }} sm={3} xs={5} className="mt-2">
                        <Card.Title>full name</Card.Title>
                    </Col>
                    <Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
                        dateTime
                    </Col>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body as={Row} dir="rtl">
                    <Col md={2} sm={2} xs={2}>
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col md={{ span: 2, offset: 5 }} sm={3} xs={5} className="mt-2">
                        <Card.Title>full name</Card.Title>
                    </Col>
                    <Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
                        dateTime
                    </Col>
                </Card.Body>
            </Card>
            <Card >
                <Card.Body as={Row} dir="rtl">
                    <Col md={2} sm={2} xs={2}>
                        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                        </svg>
                    </Col>
                    <Col md={{ span: 2, offset: 5 }} sm={3} xs={5} className="mt-2">
                        <Card.Title>full name</Card.Title>
                    </Col>
                    <Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
                        dateTime
                    </Col>
                </Card.Body>
            </Card>
        </Container>
    );

}

export default MessagesList;