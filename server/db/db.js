const low = require("lowdb");
const fs = require("fs");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(__dirname + "/users.json");
const db = low(adapter);

module.exports = db;
