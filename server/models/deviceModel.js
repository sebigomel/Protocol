const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DeviceSchema = new Schema({
    __id: ObjectId,
    serialNumber: {type: String, required: true},
    name: String,
    workspace: {type: ObjectId, required: true, ref: 'Workspace'}
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;