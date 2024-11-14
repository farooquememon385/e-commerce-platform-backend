const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Cart = sequelize.define('Cart', {
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});


User.hasMany(Cart);
Cart.belongsTo(User);

module.exports = Cart;