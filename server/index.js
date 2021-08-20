const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const usersRoutes = require('./routes/users')

const app = express();
app.use('/users', usersRoutes);

app.use(cors());

const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology : true})
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)