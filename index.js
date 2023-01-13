const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

//FoodData Central currently limits the number of API requests to a default rate of 1,000 requests per hour per IP address
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
});
app.use(limiter);
app.set('trust proxy', 1);

//Enable cors
app.use(cors());

//Routes
app.use('/food-list', require('./routes/foodList'));
app.use('/food-item', require('./routes/foodItem'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
