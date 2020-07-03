import React, { useSate, useEffect } from 'react';

import { useParams } from 'react-router-dom';

const Category = () => {
	let { id } = useParams();

	// run after every render (by default)
	useEffect(() => {
		console.log('useEffect');

		async function getProducts() {
			const res = await fetch(`http://localhost:4000/products/category/${id}`);
			const data = await res.json();

			console.log('data', data);
		}
		getProducts();
	}, []);
	return <div>category {id}</div>;
};

export default Category;
