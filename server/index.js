const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const users = require("./routes/users");
const cors = require("cors");

const envFound = require("dotenv").config();
if (!envFound) {
  console.log(
    "⚠️  No .env file for HYPER10N found: this file contains" +
      "your Stripe API key and other secrets.\nTry copying .env.example to .env" +
      "(and make sure to include your own keys!)"
  );
  process.exit(0);
}

const app = express();
app.use(bodyParser.json())
.use(cors())
.use("/api/user", users)
.use("/api/auth", auth);
async function startServer() {
  const http = require("http").createServer(app);
  http.listen(process.env.PORT, () => {
    console.log(`⚡️ Server started: http://localhost:${process.env.PORT}`);
  });
}
startServer();
