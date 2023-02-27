const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

//POST /api/ Create a new argonaut
router.post("/", (req, res, next) => {
  const { name } = req.body;

  const newUser = { name };

  User.create(newUser)
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error creating a new argonaut", err);
      res.status(500).json({
        message: "error creating a new argonaut",
        error: err,
      });
    });
});

// GET /api/ - Get list of argonauts
router.get('/', (req, res, next) => {
    User.find()
    .then(allUsers => {
        res.json(allUsers)
    })
    .catch(err => {
        console.log("error getting list of argonauts", err);
        res.status(500).json({ message: "error getting list of argonauts", error: err})
    })
})

module.exports = router;