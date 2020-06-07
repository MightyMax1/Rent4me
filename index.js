// import core nodejs modules
const http = require('http');

// import npm modules
const express = require('express');
const mongoClient = require('mongodb');

// setup express app (handle app routing)
const app = express();

// parse request body (json) middleware
app.use(express.json());

// helper functions
const { getMongoClient, createToken, verifyToken } = require('./helpers');

// private route example (for logn in users only with token)
app.get('/private', async (req, res) => {
	try {
		// read token from headers
		const token = req.headers.token;

		// verify token and get decoded (object)
		const decoded = await verifyToken(token);

		res.json(decoded);
	} catch (err) {
		console.log('private err', err.message);
		res.status(500).json({
			err: 'internal error',
		});
	}
});

// login route
app.post('/auth/login', async (req, res) => {
	try {
		// read data from request body
		const { email, password } = req.body;

		// get mongo connection
		const mongoClient = await getMongoClient();

		// define users collection
		collection = mongoClient.db('rentme').collection('users');

		// find user by email in usres collection
		const user = await collection.findOne({ email: email });

		// if user not exists or passport invalid => return error message
		if (!user || user.password !== password) {
			console.log('user with this email not exits');
			return res.json({
				err: 'email or password not valid',
			});
		}

		// create jwt token
		const token = await createToken({ email: user.email });

		// return response to client with token and user data
		res.json({
			user: user,
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
app.post('/auth/signup', async (req, res) => {
	try {
		const { email, password } = req.body;

		const mongoClient = await getMongoClient();

		collection = mongoClient.db('rentme').collection('users');

		// insert new user to users collection
		const insertOpr = await collection.insertOne({ email, password });

		console.log('insertOpr.opt', insertOpr.ops);
		console.log('insertOpr.result', insertOpr.result);

		res.json({
			err: null,
			data: 'asdas',
		});
	} catch (err) {
		console.log('/auth/signup err:', err.message);
		res.status(500).json({
			err: 'internal error',
		});
	}
});

// create http server
const server = http.createServer(app);

// process.env = allow us define variables before run script
// define server port number
const PORT = process.env.PORT || 4000;

// run server on our port
server.listen(PORT, () => {
	console.log('server run on port: ', PORT);
});
