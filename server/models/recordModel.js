const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    time: Date,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    workspace: { type: Schema.Types.ObjectId, ref: "Workspace" },
    device: { type: Schema.Types.ObjectId, ref: "Device" }
});

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;