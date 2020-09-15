const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

async function getCollection() {
	const mongoClient = await getMongoClient();
	return mongoClient.db(process.env.DB_NAME).collection('users');
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

async function getUserByEmail(email) {
	try {
		const usersColl = await getCollection();

		// find user by email in usres collection
		const user = await userCollection.findOne({ email: email });
		return user;
	} catch (error) {
		console.log('getUserByEmail err', err.message);
		return null;
	}
}

module.exports = {
	getUserById,
	getUserByEmail,

};
