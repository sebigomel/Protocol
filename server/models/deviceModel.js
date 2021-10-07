const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  serialNumber: { type: String, required: true },
  name: String,
  workspace: { type: Schema.Types.ObjectId, required: true, ref: "Workspace" },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
});

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;
