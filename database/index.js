const { getMongoClient } = require('../helpers');

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
	} catch (error) { }
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
		const categoryTitle = categoryDetails[0].name

		return { itemsByCategory, categoryTitle };
	} catch (error) {
		console.log(error.message)
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
		console.log(error.message)
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
	} catch (error) { }
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

module.exports = { getProductsAndCategories, AddProduct, getCategories, getProductsByCategoryId, getItemById };
