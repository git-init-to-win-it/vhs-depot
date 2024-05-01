const router = require("express").Router()

// Register a new instructor account
router.get("/", async (req, res, next) => {
  res.send("Auth route")
})

module.exports = router
