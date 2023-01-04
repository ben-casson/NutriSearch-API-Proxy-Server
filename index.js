const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

//Enable cors
app.use(cors());

//Routes
app.use('/food-list', require('./routes/foodList'))
app.use('/food', require('./routes/food'))



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
