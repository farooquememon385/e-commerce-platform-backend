const express = require('express');
const authToken = require('../middleware');
const router = express.Router();
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

router.post('/add/:productId', authToken, async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;

    try {
        let cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await Cart.create({ userId });
        }
        let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({ cartId: cart.id, productId, quantity: 1 });
        }

        res.status(200).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

router.put('/update/:itemId', authToken, async (req, res) => {
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    try {
        const cartItem = await CartItem.findByPk(itemId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: 'Cart item updated', cartItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart item' });
    }
});

router.delete('/remove/:itemId', authToken, async (req, res) => {
    const itemId = req.params.itemId;

    try {
        const cartItem = await CartItem.findByPk(itemId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        await cartItem.destroy();

        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});

module.exports = router;
