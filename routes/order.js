// routes/order.js
const express = require('express');
const authToken = require('../middleware');
const { Order, OrderItem, Cart, CartItem} = require('../models');

const router = express.Router();

router.post('/', authToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ where: { userId }, include: CartItem });
        if (!cart || cart.CartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const order = await Order.create({ userId });

        const orderItems = await Promise.all(cart.CartItems.map(async (cartItem) => {
            return OrderItem.create({
                orderId: order.id,
                productId: cartItem.productId,
                quantity: cartItem.quantity,
            });
        }));

        await CartItem.destroy({ where: { cartId: cart.id } });

        res.status(201).json({ message: 'Order created successfully', order, orderItems });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

router.get('/', authToken, async (req, res) => {
    try {
        const orders = await Order.findAll({ include: OrderItem });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
});

router.get('/:id', authToken, async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id, { include: OrderItem });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
});

router.get('/user/:userId', authToken, async (req, res) => {
    const userId = req.params.userId;

    try {
        const orders = await Order.findAll({ where: { userId }, include: OrderItem });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user orders' });
    }
});

module.exports = router;
