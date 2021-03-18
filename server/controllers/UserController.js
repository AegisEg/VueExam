/**
 * UserController.js
 * Author: Vasilev Egor
 */
"use strict";
const db = require("../db/db.js");
const jwt = require("jsonwebtoken");

module.exports = {
  getUsers: async (req, res, next) => {
    let { last } = req.body;
    try {
      let users = db
        .sortBy("id")
        .slice(last, last + 50)
        .value();
      if (users) {
        return res.json({
          users,
        });
      } else {
        // Unauthorized (HTTP 401)
        const err = {};
        err.param = `all`;
        err.msg = `UsersNotFount`;
        return res.status(401).json({ error: true, errors: [err] });
      }
    } catch (e) {
      return next(new Error(e));
    }
  },
  get: async (req, res, next) => {
    let userId = parseInt(req.body.userId);
    try {
      let user = db.find({ id: userId }).value();
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
  addUser: async (req, res, next) => {
    let { user } = req.body;
    try {
      let newId = db.takeRight(1).value()[0].id + 1;
      if (newId) {
        let newUser = { id: newId, ...user };
        db.push(newUser).write();
        return res.json({
          error: false,
          newUser,
        });
      } else {
        // Unauthorized (HTTP 401)
        const err = {};
        err.param = `all`;
        err.msg = `Error`;
        return res.status(401).json({ error: true, errors: [err] });
      }
    } catch (e) {
      return next(new Error(e));
    }
  },

  changeUser: async (req, res, next) => {
    let { user } = req.body;
    try {
      let userDb = db.find({ id: user.id });
      if (userDb) {
        delete user.id;
        userDb.assign({ ...user }).write();
        return res.json({
          error: false,
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
  deleteUser: async (req, res, next) => {
    let { userId } = req.body;
    try {
      let userDb = db.find({ id: userId });
      if (userDb) {
        db.remove({ id: userId }).write();
        return res.json({
          error: false,
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
};
