const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    userId : ObjectId,
    cardId : {
        type : Number,
        required : true},
    username : {
        type : String,
        required : true,
        trim : true,
        lowercase : true},
    firstName : {
        type : String,
        required : true},
    lastName : {
        type : String,
        required : true},
    email : {
        type : String,
        required : true},
    birthdate: {
        type : Date,
        immutable : true},
    workspaces: Array,
    password: {
        type : String,
        required : true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;