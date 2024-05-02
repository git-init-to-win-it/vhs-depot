require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const path = require("path")
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
app.use("/", express.static(path.join(__dirname, "/dist")))

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
