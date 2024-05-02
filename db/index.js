require("dotenv").config();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || "postgresql://localhost:5432/vhsdepot")

async function getAllMovies() {
  try {
    const allMovies = await prisma.movies.findMany({});
    return allMovies;
   } catch (error) {
    throw error
  }
}

module.exports = {
  client,
  getAllMovies
}

