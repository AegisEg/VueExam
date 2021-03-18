/**
 * AuthController.js
 * Author: Vasilev Egor
 */
"use strict";

const { validationResult } = require("express-validator");
const db = require("../db/db.js");
const jwt = require("jsonwebtoken");

module.exports = {
  checkAuth: async (req, res, next) => {
    let { user } = res.locals;
    try {
      if (user) {
        return res.json({
          user,
        });
      } else {
        // Unauthorized (HTTP 401)
        const err = {};
        err.param = `all`;
        err.msg = `UserNotFount`;
        return res.status(401).json({ error: true, errors: [err] });
      }
    } catch (e) {
      return next(new Error(e));
    }
  },
  login: async (req, res, next) => {
    const { email } = req.body;
    try {
      // This route expects the body parameters:
      //  - email: username's email
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: true, errors: errors.array() });
      }
      let user = db.find({ email }).value();
      
      if (user) {
        // Get the user for this email address
        // Success: generate and respond with the JWT
        let token = generateToken(user.id);
        return res.json({
          token,
          user,
        });
      } else {
        // Unauthorized (HTTP 401)
        const err = {};
        err.param = `all`;
        err.msg = `Wrong email`;
        return res.status(401).json({ error: true, errors: [err] });
      }
    } catch (e) {
      return next(new Error(e));
    }
  },
};
// Generates a signed JWT that encodes a user ID
// This function requires:
//  - userId: user to include in the token
function generateToken(userId) {
  // Include some data and an expiration timestamp in the JWT
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // This key expires in 1 hour
      data: { userId },
    },
    process.env.JWT_SECRET
  );
}
