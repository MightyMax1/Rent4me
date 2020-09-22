const db = require('../database');
const url = require('url');

// helper functions
const { verifyTokenSync } = require('../helpers');

module.exports = ioServer => {
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
			const user = await db.users.getUserByEmail(data.user.email);

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
};
