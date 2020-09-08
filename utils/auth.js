var jwt = require('jsonwebtoken');
const accessTokenSecret ='my_secrect_key';
/*
AUTH FOR COMMON JWT
*/
module.exports.authenticate = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).send({
		auth: false,
		message: 'No token provided.'
	})
	if (authHeader) {
		jwt.verify(authHeader, accessTokenSecret, (err, user) => {
			if (err) {
				console.log("coming in if condition-reeree", err);
				return res.sendStatus(403).send({
					code: 'invalid',
					message: 'Token empty.'
				})
			}
			if (err && err.name === 'TokenExpiredError')
				return res.status(401).send({
					code: 'TokenExpiredError',
					message: 'Token expired.'
				})

			/**
			 * If the token is invalid, send 401.
			 */
			if (err && err.name != 'TokenExpiredError')
				return res.status(401).send({
					message: 'Failed to authenticate token.'
				})

			next();
		});
	} else {
		res.sendStatus(401);
	}
}