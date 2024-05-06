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

cartRouter.put(`/`, async(req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send(`Please try logging in first`);
  }
  const prefix = `Bearer `;
  const token = authHeader.slice(prefix.length);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;
    console.log(userid);
    const userCart = await prisma.cart.findMany({
      where: {
        userid
      }
    });

    for (const cartItem of userCart) {
      const cartMovies = await prisma.movies.findMany({
        where: {
          cartid: cartItem.id
        }
      });

      for (const movie of cartMovies) {
        await prisma.movies.update({
          where: {
            id: movie.id
          },
          data: {
            cartid: null
          }
        });
      }
    }

    return res.status(200).send("Cart cleared successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while clearing the cart.");
  }
});

module.exports = cartRouter;



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