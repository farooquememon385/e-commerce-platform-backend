const cartRoutes = require('./cart');
const productRoutes = require('./product');
const authRoutes = require('./auth');
const orderRoutes = require('./order');

const routes = {
    cartRoutes,
    productRoutes,
    authRoutes,
    orderRoutes,
}

module.exports = routes;