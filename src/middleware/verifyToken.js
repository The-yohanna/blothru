import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];

	if (!token) {
		return res.status(403).send({
			message: 'No token provided!',
		});
	}

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: 'Unauthorized!',
			});
		}
		req.user = {};
		req.user.id = decoded.id;
		req.user.email = decoded.email;
		req.user.admin = decoded.admin;
		next();
	});
};

export default verifyToken;
