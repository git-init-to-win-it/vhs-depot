const express = require("express")
require("dotenv").config()
const cartRouter = express.Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require(`jsonwebtoken`)
const { getMoviesByCartId } = require("../db")


cartRouter.get("/:id", async (req, res, next) => {
  const inputCartId = parseInt(req.params.id);
  try {
    const moviesInCart = await getMoviesByCartId(inputCartId);
    res.send(moviesInCart);
  } catch (error) {
    res.status(404).send(`Could not get movies in cart`);
  }
})


//WORK IN PROGRESS
// cartRouter.post("/", async (req, res, next) => {
//   const authHeader = req.headers["authorization"]
//   if (!authHeader) {
//     return res.status(401).send(`Please try logging in first`)
//   }

//   const { movieId } = req.body;
//   const prefix = `Bearer `
//   const token = authHeader.slice(prefix.length)

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     const userid = decoded.id
//     const verifiedUser = await prisma.users.findUnique({
//       where: {
//         id: userid
//       },
//     })
 
//     if (verifiedUser && verifiedUser.cart === null) {
//       const addMovieToCart = await prisma.movies.update({
//         where: {
//           id: movieId
//         },
//       })
//     }
//   } catch (err) {
//   console.log(err)
//   }
// }) 






module.exports = cartRouter