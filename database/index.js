const { getMongoClient } = require('../helpers');

async function getProducts() {
	try {
		const mongoClient = await getMongoClient();
		// define users collection
		collection_items = mongoClient.db('rentme').collection('items');
		collection_categories = mongoClient.db('rentme').collection('categories');

		// find all products & categories,
		const products = await collection_items.find({}).toArray();
		const categories = await collection_categories.find({}).toArray();

		return { categories, products };
	} catch (error) {}
}

async function AddProduct(product) {
	try {
		// get mongo connection
		const mongoClient = await getMongoClient();
		// define users collection
		collection_items = mongoClient.db('rentme').collection('items');

		// insert new products
		const result = await collection_items.insertOne(product);

		// return the product item (with inserted _id)
		return result.ops[0];
	} catch (error) {
		console.log('AddProduct err', err.message);
	}
}

module.exports = { getProducts, AddProduct };
