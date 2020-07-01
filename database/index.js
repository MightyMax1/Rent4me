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
		product["createdAt"] = Date();//FIXME: time is not correct 
		product["userId"] = 'userId toDo...';

		// insert new products
		const result = await collection_items.insertOne(product);

		// return the product item (with inserted _id)
		return result.ops[0];
	} catch (error) {
		console.log('AddProduct err', err.message);
	}
}

module.exports = { getProductsAndCategories, AddProduct, getCategories };
