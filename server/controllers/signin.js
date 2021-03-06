const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) return res.status(404).send("User does not exist");

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!correctPassword)
      return res.status(400).send("User or password are incorrect");

    if (!existingUser.verified){
      return res.status(400).send("You need to verify your email to use your account");
    }

    const token = jwt.sign(
      { email: existingUser.email, sub: existingUser._id },
      process.env.SECRET_KEY
    );

    userData = {
      email: existingUser.email,
      _id: existingUser._id,
      username: existingUser.username,
      token: token,
    };

    res.status(200).send(userData);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = authenticateUser;
