const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10

const createUsersMoviesAndCart = async() => {
  const hashedPass1 = await bcrypt.hash(`nunya1`, saltRounds);
  const hashedPass2 = await bcrypt.hash(`nunya2`, saltRounds);
  const hashedPass3 = await bcrypt.hash(`nunya3`, saltRounds);
  const hashedPass4 = await bcrypt.hash(`nunya4`, saltRounds);

  console.log(`CLEARING TABLES`)

  const clearUsers = await prisma.users.deleteMany({});
  const clearMovies = await prisma.movies.deleteMany({});
  const clearCart = await prisma.cart.deleteMany({});
  console.log(`TABLES CLEARED`)


  const userArray = []
  const cartArray = []

  console.log(`MAKING TABLES`)

  const user1 = await prisma.users.create({
    data:{
      username: `uno`,
      password: hashedPass1,
    }
  });
  userArray.push(user1);
  const user2 = await prisma.users.create({
    data:{
      username: `does`,
      password: hashedPass2,
    }
  });
  userArray.push(user2);
  const user3 = await prisma.users.create({
    data:{
      username: `tres`,
      password: hashedPass3,
    }
  });
  userArray.push(user3);
  const user4 = await prisma.users.create({
    data:{
      username: `admin`,
      password: hashedPass4,
      role: `admin`
    }
  });

  const cart1 = await prisma.cart.create({
    data: {
      userid: userArray[0].id
    }
  });
  cartArray.push(cart1);
  const cart2 = await prisma.cart.create({
    data: {
      userid: userArray[1].id
    }
  });
  cartArray.push(cart2);
  const cart3 = await prisma.cart.create({
    data: {
      userid: userArray[2].id
    }
  });
  cartArray.push(cart3);

  const movie1 = await prisma.movies.create({
    data: {
      title: `Friday the 13th`,
      genre: `Horrer`,
      description: `Some teens go camping and have the best time ever, a summer they won't forget!`,
      cartid: cartArray[0].id
    }
  });
  const movie2 = await prisma.movies.create({
    data: {
      title: `Jurrasic Park`,
      genre: `Action`,
      description: `Ever want to see a trex? Now's your chance!`,
      cartid: cartArray[0].id
    }
  });
  const movie3 = await prisma.movies.create({
    data: {
      title: `Star Wars`,
      genre: `Sci-Fi`,
      description: `You'll never guess who Luke's dad is!`,
      cartid: cartArray[1].id
    }
  });
  const movie4 = await prisma.movies.create({
    data: {
      title: `ET`,
      genre: `Sci-Fi`,
      description: `The poor little guy just wants to go home!`,
      cartid: cartArray[1].id
    }
  });
  const movie5 = await prisma.movies.create({
    data: {
      title: `Transformers`,
      genre: `Action`,
      description: `Some giant robots fight, it's pretty dope`,
      cartid: cartArray[2].id
    }
  });
 
  console.log(`TABLES MADE`)

};

createUsersMoviesAndCart();
