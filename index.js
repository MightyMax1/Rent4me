

require('dotenv').config()
// import core nodejs modules
const http = require('http');
const url = require('url');
// import npm modules
const express = require('express');
const mongoClient = require('mongodb');
const path = require('path');

const io = require('socket.io');

const STATUSES = {
	NEW_BOOKING: 'NEW_BOOKING', //item just added
	CONFIRM_BOOKING: 'CONFIRM_BOOKING', // after lessor approve
	CONFIRM_ITEM_BY_LESSEE: 'CONFIRM_ITEM_BY_LESSEE', // after lessee received item
	CONFIRM_ITEM_BY_LESSOR: 'CONFIRM_ITEM_BY_LESSOR', // order finished (after lessor approve)
};

const cors = require('cors');

const productRouter = require('./routes/products');
const chatsRouter = require('./routes/chats');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

const db = require('./database');

// setup express app (handle app routing)
const app = express();

app.use(cors());

// parse request body (json) middleware
app.use(express.json({ limit: '10MB' }));

// register routes
app.use('/api/products', productRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

// helper functions
const { getMongoClient, createToken, verifyToken, verifyTokenSync } = require('./helpers');

//middleware that aprove user token and make user obj available
async function privateApi(req, res, next) {
	try {
		const { token } = req.headers;

		const decoded = await verifyToken(token);

		const user = await db.getUserByEmail(decoded.email);

		req.user = user;

		// call next middleware
		next();
	} catch (err) {
		res.status(401).json({
			err: err.message,
		});
	}
}

app.get('/api/footerData', async (req, res) => {
	try {
		const footerData = await db.getFooterData();
		res.json(footerData);
	} catch (error) {
		res.json(error.message);
		console.log(error.message);
	}
});

app.get('/api/auth/currentUser', privateApi, async (req, res) => {
	try {
		res.json(req.user);
	} catch (err) {
		res.json(null);
	}
});

// approve order by lessor
app.post('/api/orders/approveBooking', privateApi, async (req, res) => {
	try {
		const { orderId, userType } = req.body;
		//update order status
		//and return all orders from user(lessor)
		const orders = await db.updateOrderStatus(orderId, STATUSES.CONFIRM_BOOKING, req.user._id.toString(), userType);
		res.json(orders);
	} catch (error) {
		console.log('approveBooking err', err.message);
		res.json({ err: error.message });
	}
});

// confirm receving item by lessee/lessor
app.post('/api/orders/confirmReceiveItem', privateApi, async (req, res) => {
	try {
		const { userType, orderId } = req.body;

		const status = userType == 'lessee' ? STATUSES.CONFIRM_ITEM_BY_LESSEE : STATUSES.CONFIRM_ITEM_BY_LESSOR;
		//update order status
		//and return all updated orders to user
		const orders = await db.updateOrderStatus(orderId, status, req.user._id.toString(), userType);
		res.json(orders);
	} catch (error) {
		console.log('confirmReceiveItem err', err.message);
		res.json({ err: error.message });
	}
});

// login route
app.post('/api/auth/login', async (req, res) => {
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
app.post('/api/auth/signup', async (req, res) => {
	try {
		//user details obj
		const form = req.body;
		//add createdAt to user obj
		form['createdAt'] = Date();

		const mongoClient = await getMongoClient();
		collection = mongoClient.db('rentme').collection('users');
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

// create http server
const server = http.createServer(app);

const ioServer = io(server);

ioServer.engine.generateId = req => {
	try {
		const { token } = url.parse(req.url, true).query;
		const user = verifyTokenSync(token);
		return user._id; // custom id must be unique
	} catch (err) {
		return null;
	}
};

// emit / on
ioServer.on('connection', client => {
	console.log('new conn', client.id);

	// on client send message
	client.on('MESSAGE', async data => {
		const user = await db.getUserByEmail(data.user.email);

		let chat = null;
		// ckeck if chat exits
		chat = await db.chats.getChatByParticipants([user._id.toString(), data.receiver._id]);

		if (!chat) {
			// if chat not exists create new chat
			chat = await db.chats.createChat([user._id.toString(), data.receiver._id]);
			chat = chat.ops[0]; // result
		}
		// create message in db add chat id to message
		const newMessage = await db.messages.createMessage({
			sender: user,
			message: { text: data.message, date: Date.now() },
			receiver: data.receiver,
			chatId: chat._id,
		});

		// send message from server to user(receiver)
		ioServer.to(data.receiver._id).emit('MESSAGE', { message: data.message, user: user });
	});
});

// serve static
app.use(express.static('client/build'));

app.get('*', (req, res) => {
	console.log('here');
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// process.env = allow us define variables before run script
// define server port number
const PORT = process.env.PORT || 4000;

// run server on our port
server.listen(PORT, () => {
	console.log('server run on port: ', PORT);
});
