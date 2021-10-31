const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    time: Date,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    device: { type: Schema.Types.ObjectId, ref: "Device" },
    accepted: Boolean
});

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;