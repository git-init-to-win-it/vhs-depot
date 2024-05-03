require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const path = require("path")
const apiRouter = require("./api/index.cjs")
const cors = require('cors')

//Middleware
app.use(cors());

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

//parse headers
app.use(async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const prefix = "Bearer ";

  if (!authHeader) {
    next();
  } else if (authHeader.startsWith(prefix)) {
    const token = authHeader.slice(prefix.length);
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    if (!username) {
      next();
    } else {
      const user = await prisma.users.findUnique({
        where: {username: req.user.username}
      });
      req.user = { id: user.id, username: user.username };
      next();
    }
  } else {
    next();
  }
});

//Server Start
app.use("/api", apiRouter)
app.use("/auth", require("./auth/index.cjs"))
app.use("/", express.static(path.join(__dirname, "/dist")))

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
