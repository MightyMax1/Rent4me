
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Carousel, Badge, Card, Image, Button, Alert } from 'react-bootstrap';

const Item = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [lessor, setLessor] = useState({});
    const [index, setIndex] = useState(0); //Carousel 

    //Carousel  handle
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    // run after every render (by default)
    useEffect(() => {
        console.log('useEffect...');

        async function getItem() {
            const res = await fetch(`http://localhost:4000/products/item/${id}`);
            const data = await res.json();

            console.log('item data', data.itemDetails);
            setItem(data.itemDetails);
            setLessor(data.lessor);
        }
        getItem();
    }, []);

    function formatDate(date) {
        let d = new Date(date);
        d = d.toLocaleString('en-GB').slice(0, 10)
        return d;
    }

    return (
        <Container >
            <Row className="my-2" >
                <Badge as={Col} variant="dark" className={'text-center'} style={{ fontSize: 'large' }}>
                    {item.title}
                </Badge>
            </Row>
            <Row>
                <Col xl={4} md={4}  >
                    <Card bg="light"  >
                        <Card.Header className="text-center">
                            <Image src={lessor.profilepPic} roundedCircle />
                        </Card.Header>
                        <Card.Body className="text-center">
                            <Card.Title>{lessor.firstName} {lessor.lastName} </Card.Title>
                            <Card.Text>
                                <p>סה"כ מוצרים: 123</p>
                                <p>סה"כ עסקאות: 123</p>
                                <p>משתמש פעיל מתאריך {formatDate(lessor.registerAt)}</p>
                            </Card.Text>
                            <Button variant="primary" size="md" block>
                                שלח הודעה
                                </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={8} md={8} >
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {item.images
                            && item.images.map(img => {
                                return (
                                    <Carousel.Item>
                                        <img src={img} style={{ maxHeight: "350px", width: '100%' }} />
                                    </Carousel.Item>
                                )
                            })}
                    </Carousel>
                </Col>
            </Row>
            <Row dir="rtl" >
                <Card as={Col} xl={5} md={5} border="info" className="ml-1 mt-1">
                    <Card.Header className="text-right">תיאור מוצר</Card.Header>
                    <Card.Body className="text-right">{item.description}</Card.Body>
                </Card>
                <Card as={Col} xl={3} md={3} border="info" className="ml-1 mt-1">
                    <Card.Header className="text-right">מחירים</Card.Header>
                    <Card.Body className="text-right">
                        <Alert variant="info" className="text-center">
                            מחיר לפי שעה: {item.priceHour}&#x20aa;
                        </Alert>
                        <Alert variant="info" className="text-center">
                            מחיר לפי יום: {item.priceDay}&#x20aa;
                        </Alert>
                    </Card.Body>
                </Card>
            </Row>

            <Row dir="rtl" className="pl-1">
                <Card as={Col} xl={8} md={8} border="info" className="mt-1">
                    <Card.Body className="text-center">
                        <Card.Title>לביצוע הזמנה</Card.Title>
                        <Card.Text>הצגת זמנים פנויים והזמנה מראש</Card.Text>
                        <Button variant="primary" block>הזמן</Button>
                    </Card.Body>
                </Card>

            </Row>

            <h2 className="text-right mt-3" >
                <Badge as={Col} variant="secondary" block>חוות דעת</Badge>
            </h2>
            <Row dir="rtl" border="primary" className="mt-3">
                <Col xl={2} md={2} sm={5} xs={5}>
                    <Image src="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png" thumbnail />
                </Col>
                <Card as={Col}>
                    <Card.Header className="text-right">
                        מוחמד אבוקסיס
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="text-right">
                            מוצר פצצה ממליץ לכולם!!!המוכר גם פצצה וגם אישתו פצצה, אפילו הדודה פצצה. תגובה פיצוץ!
                         </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
            <Row dir="rtl" border="primary" className="mt-3">
                <Col xl={2} md={2} sm={5} xs={5}>
                    <Image src="https://static.thenounproject.com/png/2643420-200.png" thumbnail />
                </Col>
                <Card as={Col} >
                    <Card.Header className="text-right">
                        אלי אן
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="text-right">
                            מוצר פצצה ממליץ לכולם!!!המוכר גם פצצה וגם אישתו פצצה, אפילו הדודה פצצה. תגובה פיצוץ!
                         </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
            <Row dir="rtl" border="primary" className="mt-3">
                <Col xl={2} md={2} sm={5} xs={5}>
                    <Image src="https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-03/64/superhero-deadpool-comics-512.png" thumbnail />
                </Col>
                <Card as={Col}  >
                    <Card.Header className="text-right">
                        deadpool
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="text-right">
                            מוצר פצצה ממליץ לכולם!!!המוכר גם פצצה וגם אישתו פצצה, אפילו הדודה פצצה. תגובה פיצוץ!
                         </Card.Text>
                    </Card.Body>
                </Card>
            </Row>

        </Container>
    );

};

export default Item;
