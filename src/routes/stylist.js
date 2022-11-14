import fileUpload from '../middleware/fileUploads.js';
import {
	Applicant,
	Stylist,
} from '../models/users.js';

import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import {
	check,
	validationResult,
} from 'express-validator';

const router = express.Router();

const validations = [
	check('firstName')
		.trim()
		.isLength({
			min: 3,
		})
		.escape()
		.withMessage('Name is too short.'),
	check('lastName')
		.trim()
		.isLength({
			min: 3,
		})
		.escape()
		.withMessage('Name is too short.'),
	check('email')
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage('A valid email address is required'),
	check('phoneNumber')
		.trim()
		.isMobilePhone()
		.escape()
		.withMessage('Phone Number is not valid'),
	check('dateOfBirth')
		.trim()
		.isISO8601()
		.toDate()
		.withMessage('Enter a valid date'),
];

router.post('/send-application', fileUpload, validations, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		dateOfBirth,
		summary,
	} = req.body;

	const stylistExists = await Stylist.findOne({
		where: {
			email,
		},
	});

	const applicantExists = await Applicant.findOne({
		where: {
			email,
		},
	});

	if (stylistExists || applicantExists) {
		return res.json({
			success: false,
			message: 'Stylist exists or existing application',
		});
	}

	await Applicant.create({
		firstName,
		lastName,
		email,
		phoneNumber,
		dateOfBirth,
		photo: req.files.photo.location,
		attachments: req.files.attachments.location,
		summary,
	}).then((data) => res.json({
		sucess: true,
		message: 'Application successfully sent, it shall shortly be reviewed.',
		data,
	}))
		.catch((err) => res.json({
			success: false,
			message: err.message,
		}));
});

router.post('/login', async (req, res) => {
	try {
		const {
			email,
			password,
		} = req.body;

		const stylistExists = await Stylist.findOne({
			where: {
				email,
			},
		});
		if (!stylistExists) res.send('stylist not found');

		const validPassword = await bcrypt.compare(password, stylistExists.password);
		if (!validPassword) res.send('The password is incorrect');

		const token = jwt.sign(
			{
				id: stylistExists.id,
				email: stylistExists.email,
				stylist: true,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: 86400,
			},
		);
		return res.json({
			success: true,
			message: 'Login Successful!',
			data: token,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

export default router;
