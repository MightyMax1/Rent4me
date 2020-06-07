const MongoClient = require('mongodb').MongoClient;

const jwt = require('jsonwebtoken');

let connection = null;

const privateKey = 'secret';

function getMongoClient() {
	return new Promise((resolve, reject) => {
		const url = 'mongodb://localhost:27017';

		if (connection) return resolve(connection);

		MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
			if (err) return reject(err);

			connection = client;
			return resolve(connection);
		});
	});
}

function createToken(data) {
	return new Promise((resolve, reject) => {
		jwt.sign(data, privateKey, function (err, token) {
			if (err) return reject(err);
			return resolve(token);
		});
	});
}

function verifyToken(token) {
	return new Promise((resolve, reject) => {
		// invalid token
		jwt.verify(token, privateKey, function (err, decoded) {
			if (err) return reject(err);
			return resolve(decoded);
		});
	});
}

module.exports = {
	getMongoClient,
	createToken,
	verifyToken,
};
