const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtdecode = require("jwt-decode");
const auth = require("../middleware/auth");
const Joi = require("@hapi/joi");
User = require("../models/UserSchema");

require("dotenv").config();

const schemaregister = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(3).required(),
});
/* POST User register */
router.post("/register", (req, res) => {
  const { error } = schemaregister.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let newUser = new User();

  newUser.name = req.body.name;
  newUser.username = req.body.username;
  newUser.password = req.body.password;

  newUser.created_at = new Date();
  newUser.updated_at = new Date();

  newUser.save((err, saved) => {
    try {
      if (err) throw err.errmsg;

      res.status(200).json({
        success: true,
        message: "Successfully registered",
        saved: saved,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Something has gone wrong",
      });
    }
  });
});

const schemalogin = Joi.object().keys({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
});
/* POST User login */
router.post("/login", (req, res) => {
  const { error } = schemalogin.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  User.findOne(
    {
      username: req.body.username,
    },
    (error, user) => {
      if (error)
        res.status(500).json({
          success: false,
          message:
            "There is something wrong with the system. Please contact Administrator immediately",
          system_error: error,
        });

      if (user) {
        user.comparePassword(req.body.password, (err, isMatch) => {
          console.log(err, req.body.password, isMatch, "isMatch");
          if (err) throw err;

          if (isMatch) {
            User.findByIdAndUpdate(
              user._id,
              { $set: { last_login: new Date() } },
              (err, updated) => {
                if (err) throw err;

                var token = jwt.sign(
                  {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: "40m" }
                );

                res.cookie("token", token).json({
                  success: true,
                  message: "Correct Username/Password",
                });
              }
            );
          } else {
            res.status(401).json({
              success: false,
              message: "Invalid Username/Password",
              result: {},
            });
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: "No user found",
          result: {},
        });
      }
    }
  );
});

module.exports = router;
