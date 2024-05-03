const express = require("express")
const apiRouter = express.Router()

apiRouter.get("/", (req, res) => {
  res.send("This is the root for /api")
})
const usersRouter = require("./user.cjs")
apiRouter.use("/user", usersRouter)

const movieRouter = require("./movie.cjs")
apiRouter.use("/movie", movieRouter)

const cartRouter = require("./cart.cjs")
apiRouter.use("/cart", cartRouter)

module.exports = apiRouter
