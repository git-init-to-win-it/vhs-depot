const express = require("express")
const movieRouter = express.Router()

movieRouter.get("/", async (req, res, next) => {
  res.send("This is the movie routes api ")
})

module.exports = movieRouter
