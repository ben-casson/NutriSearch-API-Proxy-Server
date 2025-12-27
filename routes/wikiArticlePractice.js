const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

//Environment variables
const WIKI_PRACTICE_API_AUTHORIZATION = process.env.WIKI_PRACTICE_API_AUTHORIZATION;
const WIKI_PRACTICE_API_USER_AGENT = process.env.WIKI_PRACTICE_API_USER_AGENT;
const WIKI_API_BASE_URL = 'https://api.wikimedia.org/core/v1/wikipedia/en/page'

let cache = apicache.middleware

router.get('/', cache('1 day'), async (req, res) => {
    // const params = new URLSearchParams({
    //     // [API_KEY_NAME]: API_KEY_VALUE,
    //     ...url.parse(req.url, true).query
    // });
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Missing query parameter" });
    }

    const encodedTitle = encodeURIComponent(query.replaceAll(" ", "_"));
    const url = `${WIKI_API_BASE_URL}/${encodedTitle}/html`;

    try {
        const apiRes = await needle('get', url, {
      headers: {
        Authorization: WIKI_PRACTICE_API_AUTHORIZATION,
        "Api-User-Agent": WIKI_PRACTICE_API_USER_AGENT,
      },
      timeout: 10000,
    });
        const data = apiRes.body;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
        console.log("THE ERROR -> ")
    }
});

module.exports = router;
