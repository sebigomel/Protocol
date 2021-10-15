const authenticateUser = require("../../../controllers/signin");
const passport = require("passport");

module.exports = (app, path) => {
  app.post(path, authenticateUser);
  app.get(path, passport.authenticate("jwt", { session: false }), (req, res) => res.sendStatus(200))
};
