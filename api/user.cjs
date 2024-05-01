const express = require("express")
const usersRouter = express.Router()

usersRouter.get("/", async (req, res, next) => {
  res.send("This is the user routes api ")
})

module.exports = usersRouter
