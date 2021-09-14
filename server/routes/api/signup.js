const createUser  = require('../../controllers/user')


module.exports = (app, path) => {
    app.post(path , createUser)
};