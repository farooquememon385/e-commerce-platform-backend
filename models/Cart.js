const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Cart = sequelize.define('Cart', {
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
});

module.exports = Cart;