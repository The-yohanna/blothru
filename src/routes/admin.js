import Admin from '../models/users.js';
import verifyToken from '../middleware/verifyToken.js';

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import {
	check,
	validationResult,
} from 'express-validator';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

const validations = [
	check('fullName')
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
	check('password')
		.trim()
		.isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
		.withMessage('"Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number"'),
];

router.post('/register', validations, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
	const {
		fullName,
		email,
		password,
	} = req.body;

	const adminExists = await Admin.findOne({
		where: {
			email,
		},
	});

	if (adminExists) return res.status(404).send('Admin exists');

	const hashedPassword = await bcrypt.hash(password, 10);

	await Admin.create({
		fullName,
		email,
		password: hashedPassword,
	}).then((data) => res.send(data))
		.catch((err) => res.status(400).send(err.message));
});

router.post('/login', async (req, res) => {
	try {
		const {
			email,
			password,
		} = req.body;

		const adminExists = await Admin.findOne({
			where: {
				email,
			},
		});
		if (!adminExists) res.send('Admin not found');

		const validPassword = await bcrypt.compare(password, adminExists.password);
		if (!validPassword) res.send('The password is incorrect');

		const token = jwt.sign(
			{
				id: adminExists.id,
				email: adminExists.email,
				admin: true,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: 86400,
			},
		);
		res.send({
			message: 'Login Successful!',
			token,
		});
	} catch (err) {
		res.send(err.message);
	}
});

router.post('/forgotpass', async (req, res) => {
	try {
		const {
			email,
		} = req.body;

		const adminExists = await Admin.findOne({
			where: {
				email,
			},
		});
		if (!adminExists) res.send('No admin with such email');

		const token = jwt.sign(
			{
				id: adminExists.id,
				email: adminExists.mail,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: 3600,
			},
		);

		const msg = {
			from: process.env.SENDGRID_FROM_ADDRESS,
			to: email,
			subject: 'Blothru - Password Reset',
			html: `
			<head>
			 <style>
			  body, h3, p {
				  font-size: 12px,
				  font-family: sans-serif,
				  color: #000000,
			  }
			 </style>
			</head>
			<body>
				<h3>Hello,</h3>
				<p>You are receiving this email because you(or someone else) has requested password reset for your account.</p>
				<p>Please click this link or paste it in your browser within one hour of receiving this email.</p>
				<p><a href="http://localhost:8080/admin/resetpass">Password Reset</a></p>
				<p>If you did not request a password reset, please ignore this email.</p>
			</body>
		  `,
		};

		await sgMail.send(msg);
		res.send({
			mesage: 'Recovery email sent',
			token,
		});
	} catch (err) {
		res.send(err.message);
	}
});

router.put('/resetpass', verifyToken, validations.slice(1), async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		const {
			email, password,
		} = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		await Admin.update({
			password: hashedPassword,
		}, {
			where: {
				email,
			},
		});
		res.send('Password reset successful');
	} catch (err) {
		res.send(err.message);
	}
});

export default router;
