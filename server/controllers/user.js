const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = {
  getOthersInfo: async (req, res) => {
    username = req.params.username;
    let user = await User.findOne({ username: username }).select("-password");
    res.status(200).json(user);
  },
  getMyInfo: async (req, res) => {
    let user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  },
  verifyEmail: async (req, res) => {},

  googleAuth: async (req, res) => {
    const token = jwt.sign(
      { email: req.user.email, sub: req.user._id },
      process.env.SECRET_KEY
    );
    res.redirect(`http://localhost:3000/login/${token}`);
  },

  update: async (req, res) => {
    const { cardId, email, password, vaccine, doses } = req.body;
    data = {
      cardId: cardId,
      email: email,
      password: password,
      vaccine: vaccine,
      doses: doses,
    };
    let dataArray = Object.entries(data);
    providedValue = dataArray.find((element) => element[1]);
    let user = await User.findById(req.user._id);
    eval("user." + providedValue[0] + " = providedValue[1]");

    await user.save().then((emp) => {
      res.status(200).send(`Your ${providedValue[0]} was successfully updated`);
      console.log(emp);
    });
  },
};
