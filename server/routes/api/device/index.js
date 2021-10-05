const addDevice = require('../../../controllers/device')
const passport = require('passport');

module.exports = (app, path) => {
    app.post(path, passport.authenticate('jwt', { session: false }), addDevice)
    app.get(path, (req, res) => {
        res.sendStatus(200)
    })
}
