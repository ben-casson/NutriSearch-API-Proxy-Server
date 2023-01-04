const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

//Routes
app.use('/api', require('./routes/foodList'))


//Enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));