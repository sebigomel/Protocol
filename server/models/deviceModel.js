const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DeviceSchema = new Schema({
    __id: ObjectId,
    serialNumber: {type: String, required: true},
    name: String
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;