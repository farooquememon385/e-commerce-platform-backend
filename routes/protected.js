const express = require('express');
const authToken = require('../middleware');
const router = express.Router();

router.get('/dashboard', authToken, (req, res) => {
    res.json({ message: 'Protected route', user: req.user });
});

router.get('/', (req, res) => {
    res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;