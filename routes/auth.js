const router = require('express').Router();

const db = require('../database');

// helper functions
const { getMongoClient, createToken } = require('../helpers');
const { privateApi } = require('../middlewares');

router.get('/currentUser', privateApi, async (req, res) => {
	try {
		res.json(req.user);
	} catch (err) {
		res.json(null);
	}
});

// login route
router.post('/login', async (req, res) => {
	try {
		// read data from request body
		const { email, password } = req.body;

		// get mongo connection
		const mongoClient = await getMongoClient();

		// define users collection
		collection = mongoClient.db(process.env.DB_NAME).collection('users');

		// find user by email in usres collection
		const user = await collection.findOne({ email: email });

		console.log(email, 'user', user);

		// if user not exists or passport invalid => return error message
		if (!user || user.password !== password) {
			console.log('user with this email not exits');
			return res.json({
				err: 'email or password not valid',
			});
		}

		// create jwt token
		const token = await createToken({ email: user.email, _id: user._id });
		// return response to client with token and user data
		res.json({
			user: user, //TODO: pop out user password
			token,
		});
	} catch (err) {
		// handle errors
		console.log('/auth/login err:', err.message);
		res.status(500).json({
			err: 'internal error',
		});
	}
});

// sign route
router.post('/signup', async (req, res) => {
	try {
		//user details obj
		const form = req.body;
		//add createdAt to user obj
		form['createdAt'] = Date();

		const mongoClient = await getMongoClient();
		collection = mongoClient.db(process.env.DB_NAME).collection('users');
		// insert new user to users collection
		const insertOpr = await collection.insertOne(form);

		const userDataRespone = {};
		for (let key in insertOpr.ops[0]) {
			if (key !== '_id' && key !== 'password') userDataRespone[key] = insertOpr.ops[0][key];
		}

		// create jwt token
		const token = await createToken({ email: insertOpr.ops[0]['email'] });

		res.json({
			err: null,
			user: userDataRespone,
			token: token,
		});
	} catch (err) {
		console.log('/auth/signup err:', err.message);
		res.status(500).json({
			err: 'internal error',
		});
	}
});

module.exports = router;
