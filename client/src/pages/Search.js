import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, CardGroup, Card } from 'react-bootstrap';
import Api from '../Api';

const Search = () => {
    let { searchWord } = useParams();
    const [items, setItems] = useState([]);


    useEffect(() => {

        async function searchItems() {
            const data = await Api.getItemsBySearchWord(searchWord);
            console.log(data);
            setItems(data.items);
        };

        searchItems();
    }, []);

    function formatDate(date) {
        const d = new Date(date);
        return d.toLocaleString('en-GB');
    }

    return (
        <Container >
            <Row style={{ marginTop: '1%' }}>
                <Badge as={Col} variant="dark" className={'text-center'} style={{ fontSize: 'large' }}>
                    תוצאות לחיפוש: {searchWord}
                </Badge>
            </Row>
            <CardGroup as={Row} className="pt-3">
                {items.length > 0 && items.map((item, i) => {
                    return (
                        <Col xl={3} md={3} sm={6} xs={6}>
                            <Card key={i}>
                                <Link to={`/item/${item._id}`}>
                                    <Card.Img variant="top" src={item.mainImg} />
                                    <Card.Body>
                                        <Card.Title className="text-center">
                                            {item.title}
                                            <p>
                                                <Badge pill variant="primary">לשעה: {item.priceHour}</Badge>
                                                <br />
                                                <Badge pill variant="primary">ליום: {item.priceDay}</Badge>
                                            </p>

                                        </Card.Title>
                                    </Card.Body>
                                </Link>
                                <Card.Footer className="text-center">
                                    <small className="text-muted">{formatDate(item.createdAt)}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    );
                })}
            </CardGroup>
        </Container>

    );
}

export default Search;