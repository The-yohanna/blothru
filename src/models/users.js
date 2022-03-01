import sequelize from './index.js';

import {
	DataTypes,
} from 'sequelize';

const Admin = sequelize.define('Admin', {
	fullName: {
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

export default Admin;
