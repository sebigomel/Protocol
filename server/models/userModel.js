const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  cardId: Number,
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    immutable: true,
  },
  workspaces: [{ type: Schema.Types.ObjectId, ref: "Workspace" }],
  password: {
    type: String,
    required: true,
  },
  passwordCheck: String,
  verified: {
    type: Boolean,
    default: false,
  },
  vaccination: {
    vaccine: String,
    doses: Number,
  },
  role: { type: Schema.Types.ObjectId, ref: "Role" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
