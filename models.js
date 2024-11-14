const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('customer', 'admin'), defaultValue: 'customer' }
});

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    tags: { type: DataTypes.STRING }
});

const Cart = sequelize.define('Cart', {
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

const CartItem = sequelize.define('CartItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false }
});

const Order = sequelize.define('Order', {
    status: { type: DataTypes.ENUM('pending', 'processing', 'shipped'), defaultValue: 'pending' },
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

const OrderItem = sequelize.define('OrderItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false }
});

User.hasMany(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });