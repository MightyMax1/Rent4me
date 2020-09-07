const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

// collections
const users = require('./users');
const messages = require('./messages');

// get one chat of two participants
async function getChatByParticipants(participants) {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		const messagesCollection = mongoClient.db(process.env.DB_NAME).collection('chats');

		console.log("participants:", participants)
		const chat = await messagesCollection.findOne({ participants: { $all: participants } });

		return chat;
	} catch (error) {
		console.log(error.message);
	}
}
// get all chats of  participant
async function getChatsByParticipants(participant) {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		const messagesCollection = mongoClient.db(process.env.DB_NAME).collection('chats');

		const chat = await messagesCollection.find({ participants: { $all: participant } }).toArray();

		return chat;
	} catch (error) {
		console.log(error.message);
	}
}
// chat
async function createChat(participants) {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		const messagesCollection = mongoClient.db(process.env.DB_NAME).collection('chats');

		// find all products by category id
		const chat = await messagesCollection.insertOne({ participants });

		// find category title by id

		return chat;
	} catch (error) {
		console.log(error.message);
	}
}

const chats = {
	getChatByParticipants,
	getChatsByParticipants,
	createChat,
};

async function getProductsAndCategories() {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		collection_items = mongoClient.db(process.env.DB_NAME).collection('items');
		collection_categories = mongoClient.db(process.env.DB_NAME).collection('categories');

		// find all products & categories,
		const newProducts = await collection_items.find({}).sort({ createdAt: -1 }).limit(4).toArray();

		// toDO.... const trendProducts = ...

		const categories = await collection_categories.find({}).toArray();

		return { categories, newProducts };
	} catch (error) { }
}

async function getProductsByCategoryId(id) {
	try {
		const mongoClient = await getMongoClient();
		// define  collections
		collection_items = mongoClient.db(process.env.DB_NAME).collection('items');
		collection_categories = mongoClient.db(process.env.DB_NAME).collection('categories');

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

async function getUserByEmail(email) {
	try {
		const mongoClient = await getMongoClient();

		// define users collection
		userCollection = mongoClient.db(process.env.DB_NAME).collection('users');

		// find user by email in usres collection
		const user = await userCollection.findOne({ email: email });
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
		collection_categories = mongoClient.db(process.env.DB_NAME).collection('categories');
		// find all categories,
		const categories = await collection_categories.find({}).toArray();

		return { categories };
	} catch (error) { }
}

async function AddProduct(product, userEmail) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define items collection
		collection_items = mongoClient.db(process.env.DB_NAME).collection('items');

		const user = await getUserByEmail(userEmail);
		//add additional data to item
		product['createdAt'] = Date();
		product['userId'] = user._id;

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
		// define orders collection
		ordersCollection = mongoClient.db(process.env.DB_NAME).collection('orders');

		// insert new order
		const result = await ordersCollection.insertOne(order);

		// return the order details from db (with inserted _id)
		return result.ops[0];
	} catch (error) {
		console.log('AddProduct err', err.message);
	}
}

// Update order status
async function updateOrderStatus(orderId, status, userId, userType) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define users collection
		ordersCollection = mongoClient.db(process.env.DB_NAME).collection('orders');

		await ordersCollection.updateOne({ _id: ObjectID(orderId) }, { $set: { status: status } });
		console.log(`update order status by: ${userType} to ${status}`);
		const orders = await getOrdersByUserId(userId, userType);
		return orders;
	} catch (error) {
		console.log('AddProduct err', err.message);
	}
}

async function getOrdersByUserId(userId, userType) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define users collection
		ordersCollection = mongoClient.db(process.env.DB_NAME).collection('orders');

		// find orders by userId and by type of user request
		let orders;
		if (userType == 'lessor') {
			console.log('req orders db by: ', userType);
			orders = await ordersCollection.find({ lessorId: userId }).toArray();
		} else {
			console.log('req orders db by: ', userType);
			orders = await ordersCollection.find({ lesseeId: userId }).toArray();
		}

		return orders;
	} catch (error) {
		console.log('getOrders err', err.message);
	}
}

async function getOrdersByItemId(itemID) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define users collection
		ordersCollection = mongoClient.db(process.env.DB_NAME).collection('orders');
		// find orders by itemID 
		orders = await ordersCollection.find({ itemId: itemID }).toArray();
		return orders;
	} catch (error) {
		console.log('getOrders err', err.message);
	}
}

async function getItemsByUserId(userId) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define items collection
		itemsCollection = mongoClient.db(process.env.DB_NAME).collection('items');

		const ObjectId = require('mongodb').ObjectID;

		// find items owner by userId
		const items = await itemsCollection.find({ userId: ObjectId(userId) }).toArray();
		return items;
	} catch (error) {
		console.log('getItems err', err.message);
	}
}

async function getItemsByWordSearch(searchWord) {
	try {
		const mongoClient = await getMongoClient();
		// define collection
		collection_items = mongoClient.db(process.env.DB_NAME).collection('items');
		console.log('word search:', searchWord);
		const items = await collection_items
			.find({
				title: {
					$regex: `.*${searchWord}.`,
				},
			})
			.toArray();

		return { items };
	} catch (error) {
		console.log(error.message);
	}
}

async function AddReview(review) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define  collection
		reviewsCollection = mongoClient.db(process.env.DB_NAME).collection('reviews');

		// insert new review
		const result = await reviewsCollection.insertOne(review);

		// return the review  from db (with inserted _id)
		return result.ops[0];

	} catch (error) {
		console.log('AddReview err', err.message);
	}
}

async function getReviews(id) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define  collection
		reviewsCollection = mongoClient.db(process.env.DB_NAME).collection('reviews');
		// find reviews by item id
		const result = await reviewsCollection.find({ itemID: id }).sort({ createdAt: -1 }).toArray();

		// return the reviews  
		return result;

	} catch (error) {
		console.log('getReviews err', err.message);
	}
}

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
	messages,
	chats,
	users,
	getItemsByUserId,
	getItemsByWordSearch,
	AddReview,
	getReviews,
	getFooterData,
	getOrdersByItemId,
};
