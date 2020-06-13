const { getMongoClient } = require('../helpers');

async function getProducts() {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		collection = mongoClient.db('rentme').collection('products');

		// find user by email in usres collection
		const products = await collection.find({}).toArray();

		return products;
	} catch (error) {}
}

module.exports = { getProducts };
