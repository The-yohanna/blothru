const isAdmin = (req, res, next) => {
	if (req.user.admin) {
		next();
	}
	return res.status(401).send('Unauthorized!');
};

export default isAdmin;
