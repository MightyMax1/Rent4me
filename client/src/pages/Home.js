import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, CardDeck, CardGroup, Col, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Api from '../Api';

function Home(props) {
	const [counter, setCounter] = useState(0);
	let [products, setProducts] = useState([]);
	let [categories, setCategories] = useState([]);

	function onClick() {
		console.log('clicked');
		setCounter(counter + 1);
	}

	// run after every render (by default)
	useEffect(() => {
		console.log('useEffect');

		async function getDataHomePage() {

			const data = await Api.getDataHomePage();
			console.log('data', data);

			setProducts(data.newProducts);
			setCategories(data.categories);
		}

		getDataHomePage(); // function call
	}, []);

	function formatDate(date) {
		const d = new Date(date);
		return d.toLocaleString('en-GB');
	}

	console.log('categories', categories);
	console.log('products', products);

	return (
		<Container>
			<Container
				className="search "
				style={{
					marginTop: '1%',
				}}>
				<Form.Row className="align-middle">
					<Col xl={{ span: 6, offset: 2 }} md={{ span: 6, offset: 2 }} sm={{ span: 6, offset: 2 }} xs={{ span: 6, offset: 2 }}>
						<Form.Control name="freeSearch" type="text" size={'sm'} dir="rtl" placeholder="חיפוש חופשי" />
					</Col>
					<Col>
						<Button size={'sm'} onClick={onClick}>
							חפש {counter}
						</Button>
					</Col>
				</Form.Row>
			</Container>
			<Container className="categories">
				<Row style={{ marginTop: '1%' }}>
					<Badge as={Col} variant="dark" className={'text-center'} style={{ fontSize: 'medium' }}>
						קטגוריות
					</Badge>
				</Row>
				<CardGroup as={Row} className="pt-3">
					{categories.map((category, i) => {
						return (
							<Col xl={3} md={3} sm={6} xs={6}>
								<Link to={`/category/${category._id}`}>
									<Card>
										<Card.Img variant="top" src={category.img} />

										<Card.Footer className="text-center">
											<small className="text-muted">{category.name}</small>
										</Card.Footer>
									</Card>
								</Link>
							</Col>
						);
					})}
				</CardGroup>
			</Container>
			<Container className="trending"></Container>
			<Container className="newest">
				<Row className="pt-3">
					<Badge as={Col} variant="dark" style={{ fontSize: 'medium' }}>
						מוצרים חדשים
					</Badge>
				</Row>
				<CardGroup as={Row} className="pt-3">
					{products.map((product, i) => {
						return (
							<Col xl={3} md={3} sm={6} xs={6}>
								<Card key={i}>
									<Link to={`/item/${product._id}`}>
										<Card.Img variant="top" src={product.mainImg} />
										<Card.Body>
											<Card.Title>{product.title}</Card.Title>
										</Card.Body>
									</Link>
									<Card.Footer className="text-center">
										<small className="text-muted">{formatDate(product.createdAt)}</small>
									</Card.Footer>
								</Card>
							</Col>
						);
					})}
				</CardGroup>
			</Container>
		</Container>
	);
}

export default Home;
