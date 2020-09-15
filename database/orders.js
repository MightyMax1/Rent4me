const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

async function getCollection() {
    const mongoClient = await getMongoClient();
    return mongoClient.db(process.env.DB_NAME).collection('orders');
}

async function addOrder(order) {
    try {
        // define order collection
        const ordersCollection = await getCollection();

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
        // define order collection
        const ordersCollection = await getCollection();

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
        // define order collection
        const ordersCollection = await getCollection();

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
        // define order collection
        const ordersCollection = await getCollection();

        // find orders by itemID 
        orders = await ordersCollection.find({ itemId: itemID }).toArray();
        return orders;
    } catch (error) {
        console.log('getOrders err', err.message);
    }
}


module.exports = {
    addOrder,
    updateOrderStatus,
    getOrdersByUserId,
    getOrdersByItemId

};
