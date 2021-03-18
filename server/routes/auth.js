/**
 * auth.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const { check } = require("express-validator");
const verifiToken = require("../middleware/verifyToken");
const AuthController = require("../controllers/AuthController");


// Log in an existing user
router.post(
  "/login",
  [
    check("email")
      .notEmpty()
      .withMessage("Email Address in invalid format"),
   
  ],
  AuthController.login
);

router.post("/checkAuth", verifiToken, AuthController.checkAuth);
module.exports = router;
