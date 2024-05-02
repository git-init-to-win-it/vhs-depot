const router = require("express").Router()
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register a new instructor account
router.get("/", async (req, res, next) => {
  res.send("Auth route")
})

router.post("/register", async (req, res, next) => {
  try{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    const registeredUser = await prisma.users.create({
      data: {
        username: req.body.username,
        password: hashedPassword
      }
    });
    const token = jwt.sign({id: registeredUser.id}, process.env.JWT_SECRET);
    res.status(201).send({token});
  }catch(error){
    next(error);
  }
})

//login + token
router.post("/login", async (req, res, next) => {
  try{
    const currentUser = await prisma.users.findUnique({
      where: {username: req.body.username}
    });
    const matchPassword = await bcrypt.compare(req.body.password, currentUser.password);

    if(!currentUser || !matchPassword) {
      res.status(401).send("Cannot find user");
    }else {
      const token = jwt.sign({id: currentUser.id}, process.env.JWT_SECRET);

      res.send({message: "Successfully Logged in", token: token});
    }
    
  } catch(error){
    next(error);
  }

});

//admin
router.post("/admin", async(req, res) => {
  try{
    const currentRole = await prisma.users.findUnique({
      where: {
        username: req.body.username
      }
    });
    const matchPassword = await bcrypt.compare(req.body.password, currentRole?.password);

    if(!currentRole.role === "admin" || !matchPassword){
      res.status(401).send("You do not have permission to access this page");
    } else {
      const token = jwt.sign({id: currentRole.id}, process.env.JWT_SECRET);
      res.send({message: "Welcome admin", token: token});
    }
  }catch(error){
    console.log("CAUGHT ERROR WHEN LOCATING ADMIN");
  }
})

module.exports = router
