const isStylist = (req, res, next) => {
	if (req.user.stylist) {
		next();
		return;
	}
	res.status(401).json({
		success: false,
		message: 'Unauthorized!',
	});
};

export default isStylist;
