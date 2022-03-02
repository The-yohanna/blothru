import sequelize from './index.js';

import {
	DataTypes,
} from 'sequelize';

const ProfessionCategory = sequelize.define('ProfessionCategory', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
});

const Profession = sequelize.define('Profession', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
});

const Services = sequelize.define('Services', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
});

ProfessionCategory.hasMany(Profession, {
	foreignKey: {
		name: 'professionCategoryId',
		allowNull: false,
	},
});
Profession.belongsTo(ProfessionCategory);

Profession.belongsToMany(Services, {
	through: 'professionServices',
});
Services.belongsToMany(Profession, {
	through: 'professionServices',
});

export {
	ProfessionCategory,
	Profession,
	Services,
};
