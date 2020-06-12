import React, { useState, useEffect } from 'react';

function Home(props) {
	const [counter, setCounter] = useState(0);
	let [products, setProducts] = useState([]);

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
			setProducts(data);
		}

		getProducts(); // function call
	}, []);

	return (
		<div>
			<div className="search">
				<input type="text" />
				<button onClick={onClick}>search {counter}</button>
			</div>

			<div className="categories"></div>
			<div className="trending"></div>
			<div className="newest">
				{products.map((item, i) => {
					return (
						<div key={i}>
							<h2>{item.title}</h2>
							<img src={item.img} alt="car" />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Home;
