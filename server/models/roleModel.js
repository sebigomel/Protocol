const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: String,
  workspace: { ref: "Workspace", type: Schema.Types.ObjectId },
  devices: [{ type: Schema.Types.ObjectId, ref: "Device" }],
});

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
