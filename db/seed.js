const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10

const createUsersMoviesAndCart = async() => {
  const hashedPass1 = await bcrypt.hash(`nunya1`, saltRounds);
  const hashedPass2 = await bcrypt.hash(`nunya2`, saltRounds);
  const hashedPass3 = await bcrypt.hash(`nunya3`, saltRounds);
  const hashedPass4 = await bcrypt.hash(`nunya4`, saltRounds);

  const user1 = await prisma.users.create({
    data:{
      username: `uno`,
      password: hashedPass1,
    }
  });
  const user2 = await prisma.users.create({
    data:{
      username: `does`,
      password: hashedPass2,
    }
  });
  const user3 = await prisma.users.create({
    data:{
      username: `tres`,
      password: hashedPass3,
    }
  });
  const user4 = await prisma.users.create({
    data:{
      username: `admin`,
      password: hashedPass4,
      role: `admin`
    }
  });

  const movie1 = await prisma.movies.create({
    data: {
      title: `Friday the 13th`,
      genre: `Horrer`,
      description: `Some teens go camping and have the best time ever, a summer they won't forget!`
    }
  });
  const movie2 = await prisma.movies.create({
    data: {
      title: `Jurrasic Park`,
      genre: `Action`,
      description: `Ever want to see a trex? Now's your chance!`
    }
  });
  const movie3 = await prisma.movies.create({
    data: {
      title: `Star Wars`,
      genre: `Sci-Fi`,
      description: `You'll never guess who Luke's dad is!`
    }
  });
  const movie4 = await prisma.movies.create({
    data: {
      title: `ET`,
      genre: `Sci-Fi`,
      description: `The poor little guy just wants to go home!`
    }
  });
  const movie5 = await prisma.movies.create({
    data: {
      title: `Transformers`,
      genre: `Action`,
      description: `Some giant robots fight, it's pretty dope`
    }
  });

  const cart1 = await prisma.cart.create({
    data: {
      userid: 1,
      movieid: 2
    }
  });
  const cart2 = await prisma.cart.create({
    data: {
      userid: 1,
      movieid: 3
    }
  });
  const cart3 = await prisma.cart.create({
    data: {
      userid: 2,
      movieid: 1
    }
  });
  const cart4 = await prisma.cart.create({
    data: {
      userid: 3,
      movieid: 4
    }
  });
  const cart5 = await prisma.cart.create({
    data: {
      userid: 3,
      movieid: 5
    }
  });
 
};

createUsersMoviesAndCart();