
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Card, CardDeck, CardGroup } from 'react-bootstrap';
import Api from '../Api';

const Category = () => {
	let { id } = useParams();
	let [products, setProducts] = useState([]);
	let [categoryTitle, setCategoryTitle] = useState('');

	// run after every render (by default)
	useEffect(() => {
		console.log('useEffect...');

		async function getProducts() {

			const data = await Api.getProductsByCategoryId(id)
			console.log('products by cat id', data);

			setProducts(data.itemsByCategory);
			setCategoryTitle(data.categoryTitle)
		}
		getProducts();
	}, []);

	function formatDate(date) {
		const d = new Date(date);
		return d.toLocaleString('en-GB');
	}

	return (
		<Container className="categories">
			<Row style={{ marginTop: '1%' }}>
				<Badge as={Col} variant="dark" className={'text-center'} style={{ fontSize: 'large' }}>
					{categoryTitle}
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
										<Card.Title className="text-center">
											{product.title}
											<p>
												<Badge pill variant="primary">לשעה: {product.priceHour}</Badge>
												<br />
												<Badge pill variant="primary">ליום: {product.priceDay}</Badge>
											</p>

										</Card.Title>
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
	);

};

export default Category;
