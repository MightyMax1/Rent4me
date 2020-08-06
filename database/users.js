const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

async function getCollection() {
	const mongoClient = await getMongoClient();
	return mongoClient.db('rentme').collection('users');
}

// chat
async function getUserById(id) {
	try {
		const usersColl = await getCollection();
		const user = await usersColl.findOne({ _id: ObjectID(id) });
		return user;
	} catch (error) {
		console.log(error.message);
	}
}

module.exports = { getUserById };
