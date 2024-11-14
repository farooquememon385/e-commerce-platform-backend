const express = require('express');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
})

const app = express();
const port = 3000;
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.get('/', (req, res) => {
  console.log(req.query);
  res.json({ message: 'Hello World!' });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});