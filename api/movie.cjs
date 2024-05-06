const { getAllMovies, getOneMovieById } = require("../db")
const express = require("express")
const movieRouter = express.Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require(`jsonwebtoken`)

movieRouter.get("/", async (req, res, next) => {
  try {
    const allMovies = await getAllMovies()
    res.send(allMovies)
  } catch (error) {
    console.log(error)
  }
})

movieRouter.get("/:id", async (req, res, next) => {
  try {
    const inputId = parseInt(req.params.id)
    const oneMovieById = await getOneMovieById(inputId)
    res.send(oneMovieById)
  } catch (error) {
    console.log(error)
  }
})

// movieRouter.post("/", async (req, res, next) => {
//   const authHeader = req.headers["authorization"]
//   if (!authHeader) {
//     return res.status(401).send(`Please try logging in first`)
//   }

//   const { title, genre, description } = req.body
//   const prefix = `Bearer `
//   const token = authHeader.slice(prefix.length)
//   console.log(req.body)

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     const userid = decoded.id
//     const verifyAdmin = await prisma.users.findUnique({
//       where: {
//         id: userid,
//         role: `admin`,
//       },
//     })

//     if (verifyAdmin) {
//       const createdMovie = await prisma.movies.create({
//         data: {
//           title,
//           genre,
//           description,
//         },
//       })
//       return res.status(201).json(createdMovie)
//     }
//   } catch (err) {
//     console.error(err)
//     return res.status(401).send(`You do not have authorization for this`)
//   }
// })

movieRouter.post("/", async (req, res, next) => {
  try {
    const { title, genre, description } = req.body

    // Create the movie without any authentication or authorization check
    const createdMovie = await prisma.movies.create({
      data: {
        title,
        genre,
        description,
      },
    })

    // Return the created movie
    return res.status(201).json(createdMovie)
  } catch (err) {
    console.error(err)
    return res.status(500).send("An error occurred while adding the movie.")
  }
})

movieRouter.delete("/:id", async (req, res, next) => {
  const id = parseInt(req.params.id)

  try {
    const deletedMovie = await prisma.movies.delete({
      where: {
        id: id,
      },
    })
    return res.status(201).json(deletedMovie)
  } catch (err) {
    console.error(err)
    return res.status(500).send(`An error occurred while deleting the movie.`)
  }
})

movieRouter.put("/:id", async (req, res, next) => {
  const id = parseInt(req.params.id)
  const { title, genre, description } = req.body

  try {
    const updatedMovie = await prisma.movies.update({
      where: {
        id: id,
      },
      data: {
        title,
        genre,
        description,
      },
    })
    return res.status(201).json(updatedMovie)
  } catch (err) {
    console.error(err)
    return res.status(500).send(`An error occurred while updating the movie.`)
  }
})

// movieRouter.delete("/:id", async (req, res, next) => {
//   const id = parseInt(req.params.id)
//   const authHeader = req.headers["authorization"]
//   if (!authHeader) {
//     return res.status(401).send(`Please try logging in first`)
//   }

//   const { title } = req.body
//   const prefix = `Bearer `
//   const token = authHeader.slice(prefix.length)

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     const userid = decoded.id
//     const verifyAdmin = await prisma.users.findUnique({
//       where: {
//         id: userid,
//         role: `admin`,
//       },
//     })

//     if (verifyAdmin) {
//       const deletedMovie = await prisma.movies.delete({
//         where: {
//           id: id,
//           title: title,
//         },
//       })
//       return res.status(201).json(deletedMovie)
//     }
//   } catch (err) {
//     console.error(err)
//     return res.status(401).send(`You do not have authorization for this`)
//   }
// })

movieRouter.put("/:id", async (req, res, next) => {
  const id = parseInt(req.params.id)
  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    return res.status(401).send(`Please try logging in first`)
  }

  const { title, genre, description } = req.body
  const prefix = `Bearer `
  const token = authHeader.slice(prefix.length)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userid = decoded.id
    const verifyAdmin = await prisma.users.findUnique({
      where: {
        id: userid,
        role: `admin`,
      },
    })

    if (verifyAdmin) {
      const updatedMovie = await prisma.movies.update({
        where: {
          id: id,
        },
        data: {
          title,
          genre,
          description,
        },
      })
      return res.status(201).json(updatedMovie)
    }
  } catch (err) {
    console.error(err)
    return res.status(401).send(`You do not have authorization for this`)
  }
})

module.exports = movieRouter
