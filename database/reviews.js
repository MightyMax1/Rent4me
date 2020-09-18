const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

async function getCollection() {
    const mongoClient = await getMongoClient();
    return mongoClient.db(process.env.DB_NAME).collection('reviews');
}

async function AddReview(review) {
    try {
        // define  collection
        reviewsCollection = await getCollection();

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
        // define  collection
        reviewsCollection = await getCollection();

        // find reviews by item id
        const result = await reviewsCollection.find({ itemID: id }).sort({ createdAt: -1 }).toArray();

        // return the reviews  
        return result;

    } catch (error) {
        console.log('getReviews err', err.message);
    }
}

module.exports = {
    AddReview,
    getReviews

};