/**
 * auth.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const verifiToken = require("../middleware/verifyToken");
const UserController = require("../controllers/UserController");

// Log in an existing user
router.post("/get", verifiToken, UserController.get);
router.post("/getUsers", verifiToken, UserController.getUsers);
router.post("/addNewUser", verifiToken, UserController.addUser);
router.post("/changeUser", verifiToken, UserController.changeUser);
router.post("/deleteUser", verifiToken, UserController.deleteUser);
module.exports = router;
