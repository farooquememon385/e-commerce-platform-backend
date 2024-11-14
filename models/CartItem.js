const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');
const Cart = require('./Cart');

const CartItem = sequelize.define('CartItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false }
});


Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

module.exports = CartItem;