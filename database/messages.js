const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

async function getCollection() {
	const mongoClient = await getMongoClient();
	return mongoClient.db('rentme').collection('messages');
}

// chat
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
		console.log('AddProduct err', err.message);
	}
}

module.exports = { createMessage, getMessagesByChatId, getMessageByUserId };
