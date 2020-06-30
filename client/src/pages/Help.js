import React from 'react';
import {Accordion, Card, Container, Button, Row, Badge, Col } from 'react-bootstrap';

function Help(props) {
    return(
        <Container>
            <Row style={{ marginTop: "1%" }}>
				<Badge as={Col} variant="dark" className={"text-center"} style={{ fontSize: "medium" }} >שאלות נפוצות</Badge>
			</Row>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={ Button } variant="link" eventKey="0">
                            שאלה 1
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>אני התשובה לשאלה 1</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={ Button } variant="link" eventKey="0">
                            שאלה 2
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>אני התשובה לשאלה 2</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={ Button } variant="link" eventKey="0">
                            שאלה 3
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>אני התשובה לשאלה 3</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={ Button } variant="link" eventKey="0">
                            שאלה 4
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>אני התשובה לשאלה 4</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Container>
    )
}

export default Help;