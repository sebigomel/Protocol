const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkspaceSchema = new Schema({
    name: {type: String, required: true},
    admins: [{type: Schema.Types.ObjectId, required: true, ref: 'User'} ],
    employees: [ {type: Schema.Types.ObjectId, ref: 'User'} ],
    devices: [ {type: Schema.Types.ObjectId, ref: 'Device'} ]
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

module.exports = Workspace;