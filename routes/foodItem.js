const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');

//Environment variables
const API_FOOD_BASE_URL = process.env.API_FOOD_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

let id = '454004';

router.post('/', (req, res) => {
    id = req.body.id; // your implementation here
    res.send('Saved!');
});

router.get('/', async (req, res) => {
    const params = new URLSearchParams({
        // ...url.parse(req.url, true).search,
        [API_KEY_NAME]: API_KEY_VALUE,
    });

    try {
        const apiRes = await needle('get', `${API_FOOD_BASE_URL}${id}?${params}`);
        const data = apiRes.body;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
