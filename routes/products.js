const router = require('express').Router();

const db = require('../database');

router.get('/', async (req, res) => {
	try {
		const products = await db.getProducts();

		res.json(products);
	} catch (err) {
		console.log('get products err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

module.exports = router;
