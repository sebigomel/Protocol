const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const fs = require("fs");
var handlebars = require("handlebars");

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const sendEmail = async (email, subject, url) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    readHTMLFile("views/email.html", async (err, html) => {
      var template = handlebars.compile(html);
      var replacements = {
        url: url,
      };
      var htmlToSend = template(replacements);
      await transporter.sendMail({
        from: "no-reply@protocol.com",
        to: email,
        subject: subject,
        html: htmlToSend,
        attachments: [
          {
            content: fs.createReadStream("views/images/image-1.png"),
            name: "image-1.png",
            cid: 'gdfwHY54rhh543gg'
          },
          {
            content: fs.createReadStream("views/images/image-2.png"),
            name: "image-2.png",
            cid: 'JBD7gh78iuohl77h'
          },
        ],
      });
    });
  } catch (err) {
    console.error(err);
  }
};

let createUser = async (req, res) => {
  const cardId = req.body.cardId;
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const birthdate = req.body.birthdate;
  const password = req.body.password;
  const passwordCheck = req.body.passwordCheck;
  const vaccine = req.body.vaccine;
  const doses = req.body.doses;

  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) {
    return res.status(400).send("An account with this email already exists");
  }

  if (password !== passwordCheck) {
    return res.status(400).send("Passwords do not match");
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    cardId: cardId,
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    birthdate: birthdate,
    password: passwordHash,
    vaccination: { vaccine: vaccine, doses: doses },
    verificationToken: crypto.randomBytes(32).toString("hex"),
  });

  try {
    newUser.save().then((savedUser) => {
      sendEmail(
        email,
        "Verify your Protocol account",
        `http://localhost:5000/api/user/verify/${savedUser._id}/${savedUser.verificationToken}`
      );
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(409).send(err.message);
  }
};

module.exports = createUser;
