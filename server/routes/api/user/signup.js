const createUser  = require('../../../controllers/signup')


module.exports = (app, path) => {
    app.post(path , createUser)
};