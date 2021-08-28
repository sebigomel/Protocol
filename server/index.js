const express = require('express');
const {connect, set} = require('mongoose');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const { initialize } = require('passport');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use(passport.initialize());

const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;

connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((err) => console.log(err.message))

set('useFindAndModify', false)