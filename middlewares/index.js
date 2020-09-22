//middleware that aprove user token and make user obj available
async function privateApi(req, res, next) {
	try {
		const { token } = req.headers;

		const decoded = await verifyToken(token);

		const user = await db.users.getUserByEmail(decoded.email);

		req.user = user;

		// call next middleware
		next();
	} catch (err) {
		res.status(401).json({
			err: err.message,
		});
	}
}

module.exports = { privateApi };
