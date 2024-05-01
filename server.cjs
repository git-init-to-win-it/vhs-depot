require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const apiRouter = require("./api/index.cjs")

//Middleware
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const morgan = require("morgan")
app.use(morgan("dev"))

app.use((req, res, next) => {
  console.log("<____Body Logger START____>")
  console.log(req.body)
  console.log("<_____Body Logger END_____>")
  next()
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Server Start
app.use("/api", apiRouter)
app.use("/auth", require("./auth/index.cjs"))

//Root Route
app.get("/", async (req, res, next) => {
  res.send("This is the route ")
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  console.log("listening on PORT:" + process.env.PORT)
})
