const express = require("express")
require("dotenv").config()
const usersRouter = express.Router()
const { viewAllUsersAsAdmin } = require('../db')
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");


usersRouter.get("/", async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send(`Gotta log in, good buddy!`);
  }

  const prefix = `Bearer `;
  const token = authHeader.slice(prefix.length);
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id;

    const verifyAdmin = await prisma.users.findUnique({
      where: {
        id: userId,
        role: `admin`
      }
    });
    if (verifyAdmin) {
      const allUsers = await viewAllUsersAsAdmin()
      return res.send(allUsers)
    }



  } catch (error) {
    res.status(400).send(`Sorry, couldn't get users.`)

  }
})

module.exports = usersRouter

