const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const keys = require("../../config/keys");

const router = express.Router();
//@route GET api/users/current
//@desc Testing the user path
//@access Public access
router.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email
    });
  }
);

//@route POST api/users/login
//@desc login for the user
//@access Public access
router.post("/login", (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //check for passsword
    bcrypt.compare(password, user.password).then(isSame => {
      if (isSame) {
        const payload = {
          id: user.id,
          handle: user.handle,
          avatar: user.avatar
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Passwords do not match";
        return res.status(404).json(errors);
      }
    });
  });
});

//@route POST api/users/register
//@desc Registering the user
//@access Public access
router.post("/register", (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        fullName:req.body.fullName,
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err; //failed hashing
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.send("Error encountered in saving the password"));
        });
      });
    }
  });
});

module.exports = router;
