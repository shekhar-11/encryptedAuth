const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const employee = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  id: {
    required: true,
    type: String,
    unique: true,
  },
  work: {
    required: true,
    type: String,
    enum: ["manager", "developer", "designer", "analyst", "intern"],
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
employee.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) {
    //if modifying something else || password not modified
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPass = await bcrypt.hash(person.password, salt);
    person.password = hashedPass;
    next();
  } catch (err) {
    return next(err);
  }
});
employee.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
const empModel = mongoose.model("empModel", employee);
module.exports = empModel;
