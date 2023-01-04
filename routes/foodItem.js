const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');

//Environment variables
const API_FOOD_BASE_URL = process.env.API_FOOD_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get('/:id', async (req, res) => {
    // const params = new URLSearchParams({
    //     ...url.parse(req.url, true).query,
    // });
    console.log(req.params.id)

    try {
        const apiRes = await needle(
            'get',
            `${API_FOOD_BASE_URL}/${req.params.id}?${API_KEY_NAME}=${API_KEY_VALUE}`
        );
        const data = apiRes.body;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
