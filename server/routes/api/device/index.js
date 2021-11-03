const DeviceCtr = require("../../../controllers/device");
const passport = require("passport");

module.exports = (app, path) => {
  app.post(
    path,
    passport.authenticate("jwt", { session: false }),
    DeviceCtr.create
  );
  app.get(
    path + "/:workspaceId",
    passport.authenticate("jwt", { session: false }),
    DeviceCtr.get
  );
  app.get(
    path + "/one/:deviceId",
    passport.authenticate("jwt", { session: false }),
    DeviceCtr.getOne
  );
};
