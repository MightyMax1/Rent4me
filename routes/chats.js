const router = require('express').Router();

const db = require('../database');

// get chats by user id
router.get('/user/:id', async (req, res) => {
	try {
		const { id } = req.params;
		// call db function for get products
		const chats = await db.chats.getChatsByParticipants([id]);

		// return response with products
		res.json(chats);
	} catch (err) {
		console.log('get chats by user id err: ', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});


module.exports = router;
