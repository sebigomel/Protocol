const passport = require("passport");
const RoleCtr = require("../../../controllers/role");

module.exports = (app, path) => {
  app.get(path, passport.authenticate("jwt", { session: false }));
};
