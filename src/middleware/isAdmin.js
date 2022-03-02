const isAdmin = (req, res, next) => {
	if (req.user.admin) {
		next();
		return;
	}
	res.status(401).json({
		success: false,
		message: 'Unauthorized!',
	});
};

export default isAdmin;
