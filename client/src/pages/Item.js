
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Carousel, } from 'react-bootstrap';

const Item = () => {
    let { id } = useParams();
    let [item, setItem] = useState([]);
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
        }
        getItem();
    }, []);

    function formatDate(date) {
        const d = new Date(date);
        return d.toLocaleString('en-GB');
    }

    return (
        <Container xl={10} md={10} >
            <Row>
                <Col md={{ order: 1 }}>
                    <h3>{item.title}</h3>
                </Col>
                <Col md={4}>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {item.images
                            && item.images.map(img => {
                                return (
                                    <Carousel.Item>
                                        <img src={img} max-height="400px" />
                                    </Carousel.Item>
                                )
                            })}
                    </Carousel>
                </Col>

            </Row>
        </Container>
    );

};

export default Item;
