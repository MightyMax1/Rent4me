const { getMongoClient } = require('../helpers');

async function getProducts() {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		collection_items = mongoClient.db('rentme').collection('items');
		collection_categories = mongoClient.db('rentme').collection('categories');

		// find all products & categories
		const products = await collection_items.find({}).toArray();
		const categories = await collection_categories.find({}).toArray();

		return { categories, products };
	} catch (error) { }
}

module.exports = { getProducts };
