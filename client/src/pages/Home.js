import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, CardDeck, CardGroup, Col } from 'react-bootstrap'


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
		<React.Fragment>
			<div className="search">
				<input type="text" />
				<button onClick={onClick}>search {counter}</button>
			</div>

			<Container className="categories" >
				<h3>קטגוריות  מוצרים</h3>
				<Row>
					{
						categories.map((category, i) => {
							return (
								< Card as={Col} md={3} sm={2} xl={3} style={{ width: '8rem' }}>
									<Card.Img variant="top" src={category.img} />
									<Card.Footer>
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
				<h3>מוצרים חדשים</h3>
				<CardGroup>
					{
						products.map((product, i) => {
							return (
								< Card key={i} style={{ width: '5rem' }}>
									<Card.Img variant="top" src={product.mainImg} />
									<Card.Body>
										<Card.Title>{product.title}</Card.Title>
									</Card.Body>
									<Card.Footer>
										<small className="text-muted"> 27/06/2020 16:35</small>
									</Card.Footer>
								</Card>
							);
						})

					}
				</CardGroup>
			</Container>
		</React.Fragment>

	);
}

export default Home;
