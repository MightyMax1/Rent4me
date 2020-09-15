const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

async function getItemsCollection() {
    const mongoClient = await getMongoClient();
    return mongoClient.db(process.env.DB_NAME).collection('items');
}

async function getCategoriesCollection() {
    const mongoClient = await getMongoClient();
    return mongoClient.db(process.env.DB_NAME).collection('categories');
}

async function AddProduct(product, userEmail) {
    try {
        const collection_items = await getItemsCollection();

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

async function getProductsByCategoryId(id) {
    try {
        // define  collections
        collection_items = await getItemsCollection();
        collection_categories = await getCategoriesCollection();

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

async function getItemsByUserId(userId) {
    try {
        // define items collection
        collection_items = await getItemsCollection();

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
        // define items collection
        collection_items = await getItemsCollection();

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

async function getProductsAndCategories() {
    try {
        // define  collections
        collection_items = await getItemsCollection();
        collection_categories = await getCategoriesCollection();

        // find all products & categories,
        const newProducts = await collection_items.find({}).sort({ createdAt: 1 }).limit(4).toArray();

        // toDO.... const trendProducts = ...

        const categories = await collection_categories.find({}).toArray();

        return { categories, newProducts };
    } catch (error) {
        console.error(error.message);
    }
}

async function getCategories() {
    try {

        collection_categories = await getCategoriesCollection();

        // find all categories,
        const categories = await collection_categories.find({}).toArray();

        return { categories };
    } catch (error) {

    }
}

module.exports = {
    AddProduct,
    getProductsByCategoryId,
    getItemsByUserId,
    getItemsByWordSearch,
    getProductsAndCategories,
    getCategories
};
