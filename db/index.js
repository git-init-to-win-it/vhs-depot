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
    throw error;
  }
}

const viewAllUsersAsAdmin = async () => {
  try {
    const allUsers = await prisma.users.findMany({})
    return allUsers
    
  } catch (error) {
    throw error;
    
  }
}

const getOneMovieById = async inputId => {
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

const createMovieAsAdmin = async (
  title,
  genre,
  description,
  cartid,
  userId
) => {
  try {
    // Check if the user is an admin
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user || user.role !== "admin") {
      throw new Error("Only admins can create movies")
    }

    // Create a new movie
    const newMovie = await prisma.movies.create({
      data: {
        title,
        genre,
        description,
        cartid,
      },
    })
    return newMovie
  } catch (error) {
    throw error
  }
}


module.exports = {
  client,
  getAllMovies,
  getOneMovieById,
  viewAllUsersAsAdmin
}
