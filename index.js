const http = require('http');

const express = require('express');

const mongoClient = require('mongodb');

const app = express();

// middlewares
app.use(express.json());

const { getMongoClient, createToken, verifyToken } = require('./helpers');

app.get('/private', async (req, res) => {
	try {
		const token = req.headers.token;

		const decoded = await verifyToken(token);

		res.json(decoded);
	} catch (err) {
		console.log('private err', err.message);
		res.status(500).json({
			err: 'internal error',
		});
	}
});

// login
app.post('/auth/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const mongoClient = await getMongoClient();

		collection = mongoClient.db('rentme').collection('users');

		const user = await collection.findOne({ email: email });

		if (!user || user.password !== password) {
			console.log('user with this email not exits');
			return res.json({
				err: 'email or password not valid',
			});
		}

		const token = await createToken({ email: user.email });

		res.json({
			user: user,
			token,
		});

		res.json({
			err: null,
			data: 'asdas',
		});
	} catch (err) {
		console.log('/auth/login err:', err.message);
		res.status(500).json({
			err: 'internal error',
		});
	}
});
app.post('/auth/signup', async (req, res) => {
	try {
		const { email, password } = req.body;

		const mongoClient = await getMongoClient();

		collection = mongoClient.db('rentme').collection('users');

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

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
	console.log('server run on port: ', PORT);
});
