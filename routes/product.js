// routes/product.js
const express = require('express');
const Product = require('../models/Product');
const authToken = require('../middleware');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
});

router.post('/add', authToken, async (req, res) => {
    try {
        const { name, description, price, category, tags } = req.body;
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            tags,
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
});

router.put('/update:id', authToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, tags } = req.body;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.update({
            name,
            description,
            price,
            category,
            tags,
        });
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

module.exports = router;
