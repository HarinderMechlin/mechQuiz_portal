var jwt = require('jsonwebtoken');
const accessTokenSecret ='my_secrect_key';
/*
AUTH FOR COMMON JWT
*/
module.exports.authenticate = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	if (!authHeader) return res.status(401).send({
		auth: false,
		message: 'No token provided.'
	})
	if (authHeader) {

		console.log('=====authHeader======',authHeader);
		console.log('-------accessTokenSecret-------------',accessTokenSecret);
		jwt.verify(authHeader, accessTokenSecret, (err, user) => {
			console.log("coming in if condition-reeree", err);
			// if (err) {
			// 	return res.sendStatus(403).send({
			// 		code: 'invalid',
			// 		message: 'Token empty.'
			// 	})
			// }
			if (err && err.name === 'TokenExpiredError')
				return res.status(401).send({
					code: 'TokenExpiredError',
					message: 'Token expired.'
				})

               if (err && err.name === 'JsonWebTokenError'){
				return res.status(401).send({
					code: 'JsonWebTokenError',
					message: 'invalid token'
				})
			   }
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