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

movieRouter.post("/", async (req, res, next) => {
  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    return res.status(401).send(`Please try logging in first`)
  }

  const { title, genre, description } = req.body
  const prefix = `Bearer `
  const token = authHeader.slice(prefix.length)
  console.log(req.body)

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
      const createdMovie = await prisma.movies.create({
        data: {
          title,
          genre,
          description,
        },
      })
      return res.status(201).json(createdMovie)
    }
  } catch (err) {
    console.error(err)
    return res.status(401).send(`You do not have authorization for this`)
  }
})

movieRouter.delete("/:id", async (req, res, next) => {
  const id = parseInt(req.params.id)
  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    return res.status(401).send(`Please try logging in first`)
  }

  const { title } = req.body
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
      const deletedMovie = await prisma.movies.delete({
        where: {
          id: id,
          title: title,
        },
      })
      return res.status(201).json(deletedMovie)
    }
  } catch (err) {
    console.error(err)
    return res.status(401).send(`You do not have authorization for this`)
  }
})

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
    next();
  } catch (err) {
    console.error(err)
    return res.status(401).send(`You do not have authorization for this`)
  }
});

movieRouter.put("/add/:id", async (req, res, next) => {
  const id = parseInt(req.params.id)
  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    return res.status(401).send(`Please try logging in first`)
  }
  const prefix = `Bearer `
  const token = authHeader.slice(prefix.length)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;
    const verifyUser = await prisma.users.findUnique({
      where: {
        id: userid
      },
      select: {
        cart: true
      }
    });

    if (verifyUser) {
      const movie = await prisma.movies.findUnique({
        where: {
          id: id
        }
      });

      if (movie) {
        if (movie.cartid === null) {
          const updatedMovie = await prisma.movies.update({
            where: {
              id: id
            },
            data: {
              cartid: verifyUser.cart[0].id
            },
          });
          return res.status(201).json(updatedMovie);
        } else {
          return res.status(400).send("Movie is out of stock, please try again later!");
        }
      } else {
        return res.status(404).send("Movie not found.");
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(401).send(`You do not have authorization for this`);
  }
});

movieRouter.put("/remove/:id", async (req, res, next) => {
  const id = parseInt(req.params.id)
  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    return res.status(401).send(`Please try logging in first`)
  }
  const prefix = `Bearer `
  const token = authHeader.slice(prefix.length)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userid = decoded.id
    const verifyUser = await prisma.users.findUnique({
      where: {
        id: userid
      },
      select: {
        cart: true
      }
    })

    if (verifyUser) {
      const updatedMovie = await prisma.movies.update({
        where: {
          id: id,
        },
        data: {
          cartid: null
        },
      })
      return res.status(201).json(updatedMovie)
    }
    next();
  } catch (err) {
    console.error(err)
    return res.status(401).send(`You do not have authorization for this`)
  }
});

module.exports = movieRouter
