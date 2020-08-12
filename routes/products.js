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
		const newProduct = await db.AddProduct(req.body, decoded.email);

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

		// add order (req.body) object to database
		const order = {
			lessorId: lessor._id,
			lesseeId: user._id,
			lesseeFullName: user.firstName + ' ' + user.lastName,
			itemId: item._id,
			startRent,
			endRent,
			totalPrice,
			status: STATUSES.NEW_BOOKING,
			createdAt: Date(),
			itemDetails: {
				title: item.title,
				img: item.mainImg,
				price_hour: item.priceHour,
				price_day: item.priceDay,
			},
		};
		const newOrder = await db.addOrder(order);

		res.json(newOrder);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// get all order by user id and type
router.get('/ordersByUserId', async (req, res) => {
	try {

		const { id, userType } = req.query;
		const orders = await db.getOrdersByUserId(id, userType);
		res.json(orders);
	} catch (err) {
		console.log('get ordersByUserId err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// get items by word search
router.get('/itemsBySearch', async (req, res) => {
	try {
		const { searchWord } = req.query;

		const items = await db.getItemsByWordSearch(searchWord.trim().replace(' ', '|'));
		res.json(items);
	} catch (err) {
		console.log('get itemsBySearch err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// get all items by user id (lessor)
router.get('/getItemsByLessorID', async (req, res) => {
	try {

		const { id } = req.query;
		const userItems = await db.getItemsByUserId(id);
		res.json(userItems);
	} catch (err) {
		console.log('get ItemsByUserId err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

router.post('/addReview', async (req, res) => {
	try {

		//add additional data to review
		req.body['createdAt'] = Date();

		// add review to db
		const newReview = await db.AddReview(req.body);

		res.json('success');

	} catch (err) {
		console.log('add review err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
})

module.exports = router;
