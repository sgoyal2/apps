const express = require("express");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const posts = require("./routes/api/posts");

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB configuration
const db = require("./config/keys").mongoURI;
//connecting to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//passport
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);

const port = 7000;
app.listen(port, () => console.log(`server is running ${port}`));
