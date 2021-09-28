const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const WorkspaceSchema = new Schema({
    __id : ObjectId,
    name: {type: String, required: true},
    admins: [{ admin: {type: ObjectId, required: true, ref: 'User'} }],
    employees: [{ employee: {type: ObjectId, ref: 'User'} }],
    devices: [ {type: ObjectId, ref: 'Device'} ]
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

module.exports = Workspace;