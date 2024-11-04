const empModel = require("./models");
const db = require("./db");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const passport = require("passport");
const localStrategy = require("passport-local").Strategy; // extracts username and password from body
// const modelEmp = require("./models");

passport.use(
  new localStrategy(async (username, password, done) => {
    console.log("user", username);

    try {
      const usernameOriginal = await empModel.findOne({ username: username });
      console.log("THIS IS ", usernameOriginal.password);
      if (!usernameOriginal) {
        return done(null, false, { message: "NOT FOUND" });
      }
      console.log("USER FOUND");
      const isPasswordCorrect = await usernameOriginal.comparePassword(
        password
      );
      console.log("MATCH  __ ", isPasswordCorrect);
      console.log("PSWRD CMP");
      if (isPasswordCorrect) {
        return done(null, usernameOriginal);
      } else {
        return done(null, false, { message: "INCORRECT PASS" });
      }
    } catch (err) {
      return done(null, false, { message: "SOMETHING WENT WRONG" });
    }
  })
);
app.use(passport.initialize());
const localAuth = passport.authenticate("local", { session: false });
const routerImport = require("./employeeRoute");
// app.use("/employee", localAuth, routerImport);
app.use(
  "/employee",
  (req, res, next) => {
    if (req.method === "POST") {
      return next();
    }

    return localAuth(req, res, next);
  },
  routerImport
);
const PORT = 3000;
app.listen(PORT);
