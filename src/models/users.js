import sequelize from './index.js';

import {
	DataTypes,
} from 'sequelize';

const Admin = sequelize.define('Admin', {
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Applicant = sequelize.define('Applicant', {
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phoneNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	dateOfBirth: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	photo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	attachments: {
		type: DataTypes.JSON,
		allowNull: false,
	},
	summary: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Stylist = sequelize.define('Stylist', {
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phoneNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	dateOfBirth: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	photo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		validate: {
			min: 1,
			max: 10,
		},
		defaultValue: 5,
	},
	stripeConnectId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	bio: {
		type: DataTypes.STRING,
		defaultValue: null,
	},
});

export {
	Admin,
	Applicant,
	Stylist,
};
