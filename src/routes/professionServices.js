import {
	Profession,
	ProfessionCategory,
	Services,
} from '../models/professionServices.js';

import express from 'express';

const router = express.Router();

router.get('/profession-category', async (req, res) => {
	try {
		const categories = await ProfessionCategory.findAll();
		res.json({
			success: true,
			categories,
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.get('/profession', async (req, res) => {
	try {
		const professions = await Profession.findAll();
		res.json({
			success: true,
			professions,
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.get('/services', async (req, res) => {
	try {
		const services = await Services.findAll();
		res.json({
			success: true,
			services,
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.get('/profession-category/:id', async (req, res) => {
	try {
		const {
			id,
		} = req.params;
		const category = await ProfessionCategory.findByPk(id);
		res.json({
			success: true,
			category,
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.get('/profession/:id', async (req, res) => {
	try {
		const {
			id,
		} = req.params;
		const profession = await Profession.findByPk(id);
		res.json({
			success: true,
			profession,
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.get('/services/:id', async (req, res) => {
	try {
		const {
			id,
		} = req.params;
		const service = await Services.findByPk(id);
		res.json({
			success: true,
			service,
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.post('/profession-category', async (req, res) => {
	const {
		name,
		isActive,
	} = req.body;

	const categoryExists = await ProfessionCategory.findOne({
		where: {
			name,
		},
	});

	if (categoryExists) {
		return res.json({
			success: false,
			message: 'Profession category exists',
		});
	}

	await ProfessionCategory.create({
		name,
		isActive,
	}).then((data) => res.json({
		sucess: true,
		message: 'Profession category successfully created',
		data,
	}))
		.catch((err) => res.json({
			success: false,
			message: err.message,
		}));
});

router.post('/profession', async (req, res) => {
	const {
		name,
		isActive,
		ProfessionCategoryId,
	} = req.body;

	const professionExists = await Profession.findOne({
		where: {
			name,
		},
	});

	if (professionExists) {
		return res.json({
			success: false,
			message: 'Profession exists',
		});
	}

	await Profession.create({
		name,
		isActive,
		ProfessionCategoryId,
	}).then((data) => res.json({
		sucess: true,
		message: 'Profession successfully created',
		data,
	}))
		.catch((err) => res.json({
			success: false,
			message: err.message,
		}));
});

router.post('/services', async (req, res) => {
	const {
		name,
		isActive,
	} = req.body;

	const serviceExists = await Services.findOne({
		where: {
			name,
		},
	});

	if (serviceExists) {
		return res.json({
			success: false,
			message: 'Service exists',
		});
	}

	await Services.create({
		name,
		isActive,
	}).then((data) => res.json({
		sucess: true,
		message: 'Service successfully created',
		data,
	}))
		.catch((err) => res.json({
			success: false,
			message: err.message,
		}));
});

router.put('/profession-category/:id', async (req, res) => {
	try {
		const {
			id,
		} = req.params;
		const {
			name, isActive,
		} = req.body;

		await ProfessionCategory.update({
			name,
			isActive,
		}, {
			where: {
				id,
			},
		});

		res.json({
			success: true,
			message: 'Profession category update successful',
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.put('/profession/:id', async (req, res) => {
	try {
		const {
			id,
		} = req.params;
		const {
			name, isActive,
		} = req.body;

		await Profession.update({
			name,
			isActive,
		}, {
			where: {
				id,
			},
		});

		res.json({
			success: true,
			message: 'Profession update successful',
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.put('/services/:id', async (req, res) => {
	try {
		const {
			id,
		} = req.params;
		const {
			name, isActive,
		} = req.body;

		await Services.update({
			name,
			isActive,
		}, {
			where: {
				id,
			},
		});

		res.json({
			success: true,
			message: 'Service update successful',
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.delete('/profession-category/:id', async (req, res) => {
	try {
		const {
			id,
		} = req.params;

		await ProfessionCategory.destroy({
			where: {
				id,
			},
		});

		res.json({
			success: true,
			message: 'Profession category delete successful',
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.delete('/profession/:id', async (req, res) => {
	try {
		const {
			id,
		} = req.params;

		await Profession.destroy({
			where: {
				id,
			},
		});

		res.json({
			success: true,
			message: 'Profession delete successful',
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

router.delete('/services/:id', async (req, res) => {
	try {
		const {
			id,
		} = req.params;

		await Services.destroy({
			where: {
				id,
			},
		});

		res.json({
			success: true,
			message: 'Service delete successful',
		});
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
});

export default router;
