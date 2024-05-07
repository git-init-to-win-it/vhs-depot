const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

router.post("/register", async (req, res, next) => {
  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    const registeredUser = await prisma.users.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    })
    const token = jwt.sign({ id: registeredUser.id }, process.env.JWT_SECRET)
    res.status(201).send({ token })
  } catch (error) {
    next(error)
  }
})

//login + admin + token
router.post("/login", async (req, res, next) => {
  try {
    const currentUser = await prisma.users.findUnique({
      where: { username: req.body.username },
    })

    const matchPassword = await bcrypt.compare(
      req.body.password,
      currentUser?.password
    )

    if (!currentUser || !matchPassword) {
      res.status(401).send("Cannot find user")
    } else {
      const token = jwt.sign({ id: currentUser.id }, process.env.JWT_SECRET)

      res.send({
        message: "Successfully Logged in",
        token: token,
        isAdmin: currentUser.role === "admin",
      })
    }
  } catch (error) {
    next(error)
  }
})

//create a route that checks the req.user.role === "admin"
router.get("/admin", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Unauthorized', isAdmin: false});
  }
  // Check if the user's role is 'admin'
  if (req.user.role === "admin") {
      res.send({ isAdmin: true });
  } else {
      res.send({ isAdmin: false });
  }
});

//we need to send back an object with the key isAdmin that has true or false

module.exports = router
