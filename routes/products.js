const router = require('express').Router();

const db = require('../database');

const { verifyToken } = require('../helpers');

// get products
router.get('/homePage', async (req, res) => {
	try {
		// call db function for get products
		const products = await db.getProducts();

		// return response with products
		res.json(products);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// add product
router.post('/', async (req, res) => {
	try {
		// read toke from request headers
		const token = req.headers.token;

		// verify token and get decoded (object)
		const decoded = await verifyToken(token);

		console.log('body', req.body);
		console.log('user', decoded);

		// add product (req.body) object to database
		const newProduct = await db.AddProduct(req.body);

		res.json(newProduct);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

module.exports = router;
