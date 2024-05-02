const {getAllMovies} = require('../db')
const express = require("express")
const movieRouter = express.Router()
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


movieRouter.get("/", async (req, res, next) => {
  try {
    const allMovies = await getAllMovies()
    res.send(allMovies);
  } catch (error) {
    console.log(error)
    
  }
})

module.exports = movieRouter
