const router = require('express').Router();

const db = require('../database');

const { verifyToken } = require('../helpers');

const STATUSES = {
	NEW_BOOKING: 'NEW_BOOKING', //item just added
	CONFIRM_BOOKING: 'CONFIRM_BOOKING', // after lessor approve
	CONFIRM_ITEM_BY_LESSEE: 'CONFIRM_ITEM_BY_LESSEE', // after lessee received item
	CONFIRM_ITEM_BY_LESSOR: 'CONFIRM_ITEM_BY_LESSOR', // order finished (after lessor approve)
};

// get products
router.get('/homePage', async (req, res) => {
	try {
		// call db function for get products
		const ProductsAndCategories = await db.getProductsAndCategories();

		// return response with products
		res.json(ProductsAndCategories);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// get product by category
router.get('/category/:id', async (req, res) => {
	try {
		const { id } = req.params;
		// call db function for get products
		const products = await db.getProductsByCategoryId(id);

		// return response with products
		res.json(products);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// get item by id
router.get('/item/:id', async (req, res) => {
	try {
		const { id } = req.params;
		// call db function for get item by id
		const item = await db.getItemById(id);

		// return response with item details
		res.json(item);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

router.get('/categories', async (req, res) => {
	try {
		// call db function for get categories
		const categories = await db.getCategories();

		// return response with products
		res.json(categories);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// add product
router.post('/addItem', async (req, res) => {
	try {
		// read toke from request headers
		const token = req.headers.token;

		// verify token and get decoded (object)
		const decoded = await verifyToken(token);
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

// order item
router.post('/orderItem', async (req, res) => {
	try {
		// read toke from request headers

		const { user, startRent, endRent, item, lessor, totalPrice } = req.body;

		// add product (req.body) object to database
		const order = {
			lessorId: lessor._id,
			lesseeId: user._id,
			itemId: item._id,
			startRent,
			endRent,
			totalPrice,
			status: STATUSES.NEW_BOOKING,
			createdAt: Date(),
		};
		const newProduct = await db.addOrder(order);

		res.json(newProduct);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// get all order by user id
router.get('/ordersByUserId', async (req, res) => {
	try {
		// read toke from request headers

		const { id } = req.query;

		const newProduct = await db.getOrdersByUserId(id);

		res.json(newProduct);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

module.exports = router;
