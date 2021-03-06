const express = require("express");
const { connect, set } = require("mongoose");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const glob = require("glob");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));

require("./config/passport")(passport);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

glob.sync("./routes/**/*.js").forEach(function (file) {
  let modulePath = path.resolve(file);
  let route = modulePath
    .split("routes")[1]
    .replace(/\\/g, "/")
    .replace(".js", "")
    .split("/");
  if ([...route].pop() == "index") route.pop();
  require(modulePath)(app, route.join("/"));
});
const CONNECTION_URL = process.env.DATABASE_URL;

const PORT = process.env.PORT || 5000;

connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err.message));

set("useNewUrlParser", true);
set("useFindAndModify", false);
set("useCreateIndex", true);
set("returnOriginal", false);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
