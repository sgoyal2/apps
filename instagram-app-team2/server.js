const express = require("express");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB configuration
const db = require("./config/keys").mongoURI;
//connecting to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//passport
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = 7000;
app.listen(port, () => console.log(`server is running ${port}`));
