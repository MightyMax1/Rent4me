const MongoClient = require('mongodb').MongoClient;

const jwt = require('jsonwebtoken');

// private key for create jwt
const privateKey = 'secret';

let connection = null;
/**
 * @name getMongoClient
 * @description return connection for mongo client.
 */
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

/**
 * @name createToken
 * @description create token from object
 * @param {Object} data object to create jwt
 * @return {Promise} with token
 *
 */
function createToken(data) {
	return new Promise((resolve, reject) => {
		jwt.sign(data, privateKey, function (err, token) {
			if (err) return reject(err);
			return resolve(token);
		});
	});
}

/**
 * @name verifyToken
 * @description verify token , return error if token not valid
 * @param {string} token token to verify
 * @return {Promise} decoded object
 */
function verifyToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, privateKey, function (err, decoded) {
			if (err) return reject(err);
			return resolve(decoded);
		});
	});
}
function verifyTokenSync(token) {
	return jwt.verify(token, privateKey);
}

module.exports = {
	getMongoClient,
	createToken,
	verifyToken,
	verifyTokenSync,
};
