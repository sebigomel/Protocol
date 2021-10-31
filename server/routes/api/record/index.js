const RecordCtr = require("../../../controllers/record");

module.exports = (app, path) => {
  app.post(path, RecordCtr.create);
  app.get(
    path + "/:workspaceId",
    passport.authenticate("jwt", { session: false }),
    RecordCtr.get
  );
};
