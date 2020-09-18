const { getMongoClient } = require('../helpers');

const { ObjectID, MongoClient } = require('mongodb');

// collections
const users = require('./users');
const messages = require('./messages');
const chats = require('./chats');
const orders = require('./orders');
const itemsAndCategories = require('./itemsAndCategories');
const reviews = require('./reviews');


async function getFooterData() {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		collection_users = await mongoClient.db(process.env.DB_NAME).collection('users');
		collection_orders = await mongoClient.db(process.env.DB_NAME).collection('orders');
		collection_items = await mongoClient.db(process.env.DB_NAME).collection('items');

		const totalUsers = await collection_users.find({}).count();
		const totalOrders = await collection_orders.find({ status: 'CONFIRM_ITEM_BY_LESSOR' }).count();
		const totalItems = await collection_items.find({}).count();


		return { totalUsers, totalOrders, totalItems };
	} catch (error) { }
}

async function getItemById(id) {
	try {
		const mongoClient = await getMongoClient();
		// define items collection
		collection_items = mongoClient.db(process.env.DB_NAME).collection('items');
		// define users collection
		collection_users = mongoClient.db(process.env.DB_NAME).collection('users');
		// define orders collection
		collection_orders = mongoClient.db(process.env.DB_NAME).collection('orders');

		const ObjectId = require('mongodb').ObjectID;
		// find item by id
		const itemDetails = await collection_items.findOne({ _id: ObjectId(id) });

		const lessor = await collection_users.findOne({ _id: ObjectId(itemDetails.userId) });

		const totalItemsOwn = await collection_items.find({ userId: ObjectId(itemDetails.userId) }).count();

		const totalLessorOrders = await collection_orders.find({ lessorId: itemDetails.userId.toString() }).count();

		return { itemDetails, lessor, totalItemsOwn, totalLessorOrders };
	} catch (error) {
		console.log(error.message);
	}
}

module.exports = {
	messages,
	chats,
	users,
	orders,
	itemsAndCategories,
	reviews,
	getFooterData,
	getItemById
};
