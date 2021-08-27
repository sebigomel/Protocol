const express = require('express');
const bodyParser = require('body-parser');
const {connect, set} = require('mongoose');
const cors = require('cors');
const glob = require('glob')
const path = require('path')
require('dotenv').config()

const app = express();

glob.sync("./routes/**/*.js").forEach(function (file) {
        let modulePath = path.resolve(file)
        let route = modulePath.split("routes")[1].replace(/\\/g, '/').replace(".js", "").split('/')
        if ([...route].pop() == "index") route.pop()
        require(modulePath)(app, route.join('/'));
});

app.use(cors());

const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;

connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((err) => console.log(err.message))

set('useFindAndModify', false)