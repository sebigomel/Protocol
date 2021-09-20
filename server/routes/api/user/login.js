const authenticateUser  = require('../../../controllers/signin')

module.exports = (app, path) => {
    app.post(path, authenticateUser)
};