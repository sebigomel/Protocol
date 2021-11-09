const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  cardId: String,
  username: String,
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
  password: String,
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
  verificationToken: String,
  profileImageUrl: String,
  googleId: String,
  isolated: Boolean,
  isolationTime: Date,
  waitingCardId: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
