const express = require("express")
require("dotenv").config()
const cartRouter = express.Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require(`jsonwebtoken`)
const { getMoviesByCartId } = require("../db")


cartRouter.get("/", async (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(401).send(`Please log in to see cart.`)
  }
  const prefix = `Bearer `
  const token = authHeader.slice(prefix.length)

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;
    const verifyCartNum = await prisma.cart.findMany({
      where: {
        userid: userid
      }
    })
    const curUserCartId = verifyCartNum[0].id;
    if (!curUserCartId) {
      return res.status(400).send("You don't have a cart!");
    } else {
      const curUserCartMovies = await prisma.movies.findMany({
        where: {
          cartid: curUserCartId
        }
      })
      res.send(curUserCartMovies);
    }
   
  } catch (error) {
    console.log(error)
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