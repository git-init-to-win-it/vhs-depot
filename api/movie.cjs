

const {getAllMovies, getOneMovieById} = require('../db')
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

movieRouter.get("/:id", async (req, res, next) => {
  try {
    const inputId = parseInt(req.params.id);
    const oneMovieById = await getOneMovieById(inputId)
    res.send(oneMovieById);
    
  } catch (error) {
    console.log(error)
    
  }
})

module.exports = movieRouter
