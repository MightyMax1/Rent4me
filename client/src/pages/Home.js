import React, { useState, useEffect } from 'react';

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
			const res = await fetch('http://localhost:4000/products');
			const data = await res.json();

			console.log('data', data);
			setProducts(data.products);
			setCategories(data.categories);
		}

		getProducts(); // function call
	}, []);

	console.log('categories', categories);
	console.log('products', products);

	return (
		<div>
			<div className="search">
				<input type="text" />
				<button onClick={onClick}>search {counter}</button>
			</div>

			<div className="categories" style={{ display: 'flex', flexWrap: 'wrap ', width: '70%', margin: 'auto' }}>
				{
					categories.map((category, i) => {
						return (
							<div key={i} >
								<h5>{category.name}</h5>
								<img src={category.img} width="150" height="200" />
							</div>
						);
					})
				}
			</div>
			<div className="trending"></div>
			<div className="newest">
				{
					products.map((product, i) => {
						return (
							<div key={i}>
								<h6>title:{product.title}</h6>
								<img src={product.mainImg} width="150" height="200" />
							</div>

						);
					})
				}
			</div>
		</div>
	);
}

export default Home;
