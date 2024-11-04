const express = require("express");
const router = express.Router();

const empModel = require("./models");
router.post("/", async function (req, res) {
  try {
    const data = req.body;
    const obj = new empModel(data);
    const response = await obj.save();
    res.send("THE DATA HAS BEEN SAVED");
  } catch (error) {
    res.send("Error");
  }
});

router.get("/", async function (req, res) {
  try {
    if (!req.user) {
      return res.status(400).json("SERVER ERROR");
    }
    const usernameEntered = req.user.username;
    const data = await empModel.find({ username: usernameEntered });
    // const data = await empModel.find();
    res.send(data);
  } catch (error) {
    console.log("Error Detected");
  }
});

router.get("/:workType", async function (req, res) {
  try {
    const workType = req.params.workType;

    if (
      workType === "manager" ||
      workType === "developer" ||
      workType === "designer" ||
      workType === "analyst" ||
      workType === "intern"
    ) {
      const response = await empModel.find({ work: workType });
      res.send(response);
    } else {
      res.status(400).json("SERVER ERROR");
    }
  } catch (error) {
    console.log(":Error");
  }
});

module.exports = router;
