const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const WorkspaceSchema = new Schema({
    __id : ObjectId,
    name: {type: String, required: true},
    admin: [ {type: ObjectId, required: true, ref: 'User'} ],
    employees: [ {type: ObjectId, ref: 'User'} ]
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

module.exports = Workspace;