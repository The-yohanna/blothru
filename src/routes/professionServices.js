import isAdmin from '../middleware/isAdmin.js';
import verifyToken from '../middleware/verifyToken.js';
import {
	Profession,
	ProfessionCategory,
	Services,
} from '../models/professionServices.js';

import express from 'express';

const router = express.Router();

router.get('/profession-category', async (req, res) => {
	try {
		const categories = await ProfessionCategory.findAll({
			include: Profession,
		});
		return res.json({
			success: true,
			data: categories,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.get('/profession', async (req, res) => {
	try {
		const professions = await Profession.findAll({
			include: {
				model: Services,
				through: {
					attributes: [],
				},
			},
		});
		return res.json({
			success: true,
			data: professions,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.get('/services', async (req, res) => {
	try {
		const services = await Services.findAll({
			include: {
				model: Profession,
				through: {
					attributes: [],
				},
			},
		});
		return res.json({
			success: true,
			data: services,
		});
	} catch (err) {
		return res.json({
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
		const category = await ProfessionCategory.findByPk(id, {
			include: Profession,
		});
		return res.json({
			success: true,
			data: category,
		});
	} catch (err) {
		return res.json({
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
		const profession = await Profession.findByPk(id, {
			include: {
				model: Services,
				through: {
					attributes: [],
				},
			},
		});
		return res.json({
			success: true,
			data: profession,
		});
	} catch (err) {
		return res.json({
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
		const service = await Services.findByPk(id, {
			include: {
				model: Profession,
				through: {
					attributes: [],
				},
			},
		});
		return res.json({
			success: true,
			data: service,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.post('/profession-category', verifyToken, isAdmin, async (req, res) => {
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

router.post('/profession', verifyToken, isAdmin, async (req, res) => {
	const {
		name,
		isActive,
		professionCategoryId,
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
		professionCategoryId,
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

router.post('/services', verifyToken, isAdmin, async (req, res) => {
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

router.post('/services/:id/add-profession-service', verifyToken, isAdmin, async (req, res) => {
	try {
		const {
			id,
		} = req.params;
		const {
			professionId,
		} = req.body;

		const service = await Services.findByPk(id);
		const profession = await Profession.findByPk(professionId);

		await service.addProfession(profession);

		return res.json({
			success: true,
			message: 'Service assigned profession successfully.',
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.put('/profession-category/:id', verifyToken, isAdmin, async (req, res) => {
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

		return res.json({
			success: true,
			message: 'Profession category update successful',
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.put('/profession/:id', verifyToken, isAdmin, async (req, res) => {
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

		return res.json({
			success: true,
			message: 'Profession update successful',
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.put('/services/:id', verifyToken, isAdmin, async (req, res) => {
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

		return res.json({
			success: true,
			message: 'Service update successful',
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.put('/services/:id/remove-profession-service', verifyToken, isAdmin, async (req, res) => {
	try {
		const {
			id,
		} = req.params;
		const {
			professionId,
		} = req.body;

		const service = await Services.findByPk(id);
		const profession = await Profession.findByPk(professionId);

		await service.removeProfession(profession);

		return res.json({
			success: true,
			message: 'Removed profession from service successfully',
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.delete('/profession-category/:id', verifyToken, isAdmin, async (req, res) => {
	try {
		const {
			id,
		} = req.params;

		await ProfessionCategory.destroy({
			where: {
				id,
			},
		});

		return res.json({
			success: true,
			message: 'Profession category delete successful',
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.delete('/profession/:id', verifyToken, isAdmin, async (req, res) => {
	try {
		const {
			id,
		} = req.params;

		await Profession.destroy({
			where: {
				id,
			},
		});

		return res.json({
			success: true,
			message: 'Profession delete successful',
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

router.delete('/services/:id', verifyToken, isAdmin, async (req, res) => {
	try {
		const {
			id,
		} = req.params;

		await Services.destroy({
			where: {
				id,
			},
		});

		return res.json({
			success: true,
			message: 'Service delete successful',
		});
	} catch (err) {
		return res.json({
			success: false,
			message: err.message,
		});
	}
});

export default router;
