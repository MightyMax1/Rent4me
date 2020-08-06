const router = require('express').Router();

const db = require('../database');

// get chats by user id
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await db.users.getUserById(id);
		res.json(user);
	} catch (err) {
		console.log('get user by id err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

module.exports = router;
