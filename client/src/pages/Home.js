import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, CardDeck, CardGroup, Col, Badge, Form } from 'react-bootstrap'


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

		async function getProducts() {
			const res = await fetch('http://localhost:4000/products/homePage');
			const data = await res.json();

			console.log('data', data);
			setProducts(data.newProducts);
			setCategories(data.categories);
		}

		getProducts(); // function call
	}, []);

	console.log('categories', categories);
	console.log('products', products);

	return (
		<Container >
			<Container className="search " style={{
				marginTop: "1%"
			}}>
				< Form >
					<Form.Row className="align-middle" >
						<Col xl={{ span: 6, offset: 2 }} md={{ span: 6, offset: 2 }} sm={{ span: 6, offset: 2 }} xs={{ span: 6, offset: 2 }}>
							<Form.Control name="freeSearch" type="text" size={"sm"} dir="rtl" placeholder="חיפוש חופשי" />
						</Col>
						<Col>
							<Button size={"sm"} onClick={onClick}>חפש {counter}</Button>
						</Col>
					</Form.Row>
				</Form>
			</Container>
			<Container className="categories" >
				<Row style={{ marginTop: "1%" }}>
					<Badge as={Col} variant="dark" className={"text-center"} style={{ fontSize: "medium" }} >קטגוריות</Badge>
				</Row>
				<Row>
					{
						categories.map((category, i) => {
							return (
								< Card as={Col} xl={3} md={3} sm={6} xs={6}>
									<Card.Img variant="top" src={category.img} style={{ maxWidth: "300px" }} />
									<Card.Footer className="text-center">
										<small className="text-muted">{category.name}</small>
									</Card.Footer>
								</Card>
							)
						})
					}
				</Row>
			</Container>
			<Container className="trending"></Container>
			<Container className="newest">
				<Row style={{ marginTop: "3%" }}>
					<Badge as={Col} variant="dark" style={{ fontSize: "medium" }}>מוצרים חדשים</Badge>
				</Row>
				<CardGroup as={Row} >
					{
						products.map((product, i) => {
							return (
								<Col xl={3} md={3} sm={6} xs={6}>
									<Card key={i} >
										<Card.Img variant="top" src={product.mainImg} />
										<Card.Body>
											<Card.Title>{product.title}</Card.Title>
										</Card.Body>
										<Card.Footer className="text-center">
											<small className="text-muted"> 27/06/2020 16:35</small>
										</Card.Footer>
									</Card>
								</Col>
							);
						})

					}
				</CardGroup>
			</Container>
		</Container >

	);
}

export default Home;
