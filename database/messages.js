const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

async function getCollection() {
	const mongoClient = await getMongoClient();
	return mongoClient.db('rentme').collection('messages');
}


async function getMessagesByChatId(id) {
	try {
		const messagesColl = await getCollection();
		const user = await messagesColl.find({ chatId: ObjectID(id) }).toArray();
		return user;
	} catch (error) {
		console.log(error.message);
	}
}

async function getMessageByUserId(id) {
	try {
		const messagesColl = await getCollection();

		const messages = await messagesColl.find({ 'receiver._id': id }).toArray();

		return messages;
	} catch (error) {
		console.log(error.message);
	}
}

async function createMessage({ sender, message, receiver, chatId }) {
	try {
		const messagesColl = await getCollection();

		const result = await messagesColl.insertOne({ sender, message, receiver, chatId });

		return result.ops[0];
	} catch (error) {
		console.log('AddProduct err', error.message);
	}
}

async function getLastMsgByChatID(chatID) {
	try {
		console.log('chatID:', chatID)
		const messagesColl = await getCollection();

		const result = await messagesColl.find({ 'chatId': ObjectID(chatID) }).sort({ 'message.date': - 1 }).limit(1).toArray();
		return result;
	} catch (error) {
		console.log('getLastMsg:', error.message)
	}
}

module.exports = {
	createMessage,
	getMessagesByChatId,
	getMessageByUserId,
	getLastMsgByChatID
};
