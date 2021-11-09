const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  serialNumber: { type: String, required: true, unique: true },
  name: String,
  workspace: { type: Schema.Types.ObjectId, required: true, ref: "Workspace" },
});

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;
