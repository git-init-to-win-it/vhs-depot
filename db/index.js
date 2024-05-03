require("dotenv").config()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { Client } = require("pg")
const client = new Client(
  process.env.DATABASE_URL || "postgresql://localhost:5432/vhsdepot"
)

const getAllMovies = async () => {
  try {
    const allMovies = await prisma.movies.findMany({})
    return allMovies
  } catch (error) {
    throw error
  }
}

const getOneMovieById = async (inputId) => {
  try {
    const oneMovieById = await prisma.movies.findUnique({
      where: {
        id: inputId,
      },
    })
    return oneMovieById
  } catch (error) {
    throw error
  }
}

const getMoviesByCartId = async (inputCartId) => {
  try {
    const moviesByCartId = await prisma.movies.findMany({
      where: {
        cartid: inputCartId
      }
    })
    return moviesByCartId
  } catch (error) {
    throw error
  }
}

module.exports = {
  client,
  getAllMovies,
  getOneMovieById,
  getMoviesByCartId
}
