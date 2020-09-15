const { getMongoClient } = require('../helpers');

const { ObjectID } = require('mongodb');

async function getCollection() {
    const mongoClient = await getMongoClient();
    return mongoClient.db(process.env.DB_NAME).collection('chats');
}

// get one chat of two participants
async function getChatByParticipants(participants) {
    try {
        // define chat collection
        const chatsCollection = await getCollection();

        console.log("participants:", participants)
        const chat = await chatsCollection.findOne({ participants: { $all: participants } });

        return chat;
    } catch (error) {
        console.log(error.message);
    }
}

// get all chats of  participant
async function getChatsByParticipants(participant) {
    try {
        // define chat collection
        const chatsCollection = await getCollection();

        const chat = await messagesCollection.find({ participants: { $all: participant } }).toArray();

        return chat;
    } catch (error) {
        console.log(error.message);
    }
}

// chat
async function createChat(participants) {
    try {
        // define chat collection
        const chatsCollection = await getCollection();

        // find all products by category id
        const chat = await messagesCollection.insertOne({ participants });

        // find category title by id

        return chat;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getChatByParticipants,
    getChatsByParticipants,
    createChat,
};
