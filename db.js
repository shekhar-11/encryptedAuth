const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/aUtH";

mongoose.connect(url);
const database = mongoose.connection;

database.on("connected", function () {
  console.log("database CONNECTED");
});
database.on("disconnected", function () {
  console.log("database DISCONNECTED");
});

module.exports = database;
