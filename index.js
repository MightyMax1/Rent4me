require('dotenv').config();
// import core nodejs modules
const http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');
const io = require('socket.io');

const db = require('./database');

const productRouter = require('./routes/products');
const chatsRouter = require('./routes/chats');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');

const app = express();

// define global vars
global.STATUSES = {
	NEW_BOOKING: 'NEW_BOOKING', //item just added
	CONFIRM_BOOKING: 'CONFIRM_BOOKING', // after lessor approve
	CONFIRM_ITEM_BY_LESSEE: 'CONFIRM_ITEM_BY_LESSEE', // after lessee received item
	CONFIRM_ITEM_BY_LESSOR: 'CONFIRM_ITEM_BY_LESSOR', // order finished (after lessor approve)
};

app.use(cors());

// serve static
app.use(express.static('client/build'));

// parse request body (json) middleware
app.use(express.json({ limit: '10MB' }));

// register routes
app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);

app.get('/api/footerData', async (req, res) => {
	try {
		const footerData = await db.getFooterData();
		res.json(footerData);
	} catch (error) {
		res.json(error.message);
		console.log(error.message);
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// create http server
const server = http.createServer(app);

const ioServer = io(server);

const initSocket = require('./socket');

initSocket(ioServer);

// process.env = allow us define variables before run script
// define server port number
const PORT = process.env.PORT || 4000;

// run server on our port
server.listen(PORT, () => {
	console.log('server run on port: ', PORT);
});
