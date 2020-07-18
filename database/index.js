const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

async function getProductsAndCategories() {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		collection_items = mongoClient.db('rentme').collection('items');
		collection_categories = mongoClient.db('rentme').collection('categories');

		// find all products & categories,
		const newProducts = await collection_items.find({}).sort({ createdAt: -1 }).limit(4).toArray();

		// toDO.... const trendProducts = ...

		const categories = await collection_categories.find({}).toArray();

		return { categories, newProducts };
	} catch (error) {}
}

async function getProductsByCategoryId(id) {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		collection_items = mongoClient.db('rentme').collection('items');
		collection_categories = mongoClient.db('rentme').collection('categories');

		// find all products by category id
		const itemsByCategory = await collection_items.find({ category_id: id }).toArray();
		// find category title by id
		var ObjectId = require('mongodb').ObjectID;
		const categoryDetails = await collection_categories.find({ _id: ObjectId(id) }).toArray();
		const categoryTitle = categoryDetails[0].name;

		return { itemsByCategory, categoryTitle };
	} catch (error) {
		console.log(error.message);
	}
}

async function getItemById(id) {
	try {
		const mongoClient = await getMongoClient();
		// define items collection
		collection_items = mongoClient.db('rentme').collection('items');
		// define users collection
		collection_users = mongoClient.db('rentme').collection('users');

		const ObjectId = require('mongodb').ObjectID;
		// find item by id
		const itemDetails = await collection_items.findOne({ _id: ObjectId(id) });
		//find lessor own the item
		//TODO: delete the fake and uncomment the lessorId
		const fakeUserId = '5ee8a3e45fe4e235b8228cc2';
		//const lessorId = itemDetails.userId
		const lessor = await collection_users.findOne({ _id: ObjectId(fakeUserId) });

		return { itemDetails, lessor };
	} catch (error) {
		console.log(error.message);
	}
}

async function getUserByEmail(email) {
	try {
		const mongoClient = await getMongoClient();

		// define users collection
		collection = mongoClient.db('rentme').collection('users');

		// find user by email in usres collection
		const user = await collection.findOne({ email: email });
		return user;
	} catch (error) {
		console.log('getUserByEmail err', err.message);
		return null;
	}
}

async function getCategories() {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		collection_categories = mongoClient.db('rentme').collection('categories');
		// find all categories,
		const categories = await collection_categories.find({}).toArray();

		return { categories };
	} catch (error) {}
}

async function AddProduct(product) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define users collection
		collection_items = mongoClient.db('rentme').collection('items');

		//add additional data to item
		product['createdAt'] = Date();
		product['userId'] = 'userId toDo...';

		// insert new products
		const result = await collection_items.insertOne(product);

		// return the product item (with inserted _id)
		return result.ops[0];
	} catch (error) {
		console.log('AddProduct err', err.message);
	}
}

// orders

async function addOrder(order) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define users collection
		ordersCollection = mongoClient.db('rentme').collection('orders');

		// insert new products
		const result = await ordersCollection.insertOne(order);

		// return the product item (with inserted _id)
		return result.ops[0];
	} catch (error) {
		console.log('AddProduct err', err.message);
	}
}

// Update order status
async function updateOrderStatus(orderId, status, userId) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define users collection
		ordersCollection = mongoClient.db('rentme').collection('orders');

		// insert new products
		await ordersCollection.updateOne({ _id: ObjectID(orderId) }, { $set: { status: status } });
		const orders = await getOrdersByUserId(userId);
		return orders;
	} catch (error) {
		console.log('AddProduct err', err.message);
	}
}

async function getOrdersByUserId(userId) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define users collection
		ordersCollection = mongoClient.db('rentme').collection('orders');

		// insert new products
		const orders = await ordersCollection.find({ lessorId: userId }).toArray();

		console.log('orders', typeof userId);

		// return the product item (with inserted _id)
		return orders;
	} catch (error) {
		console.log('AddProduct err', err.message);
	}
}

module.exports = {
	getProductsAndCategories,
	getUserByEmail,
	AddProduct,
	getCategories,
	getProductsByCategoryId,
	getItemById,
	addOrder,
	getOrdersByUserId,
	updateOrderStatus,
};
