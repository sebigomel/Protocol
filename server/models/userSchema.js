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
        required : true},
    firstName : {
        type : String,
        required : true},
    lastName : {
        type : String,
        required : true},
    email : {
        type : String,
        required : true},
    bornAt: {
        type : Date,
        immutable : true}
});

const userSchema = mongoose.model('UserSchema', userSchema);

export default userSchema;