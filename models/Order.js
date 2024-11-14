const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Order = sequelize.define('Order', {
    status: { type: DataTypes.ENUM('pending', 'processing', 'shipped'), defaultValue: 'pending' },
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;