const faker = require('faker');
const db = require('../config/connection');
const { Dog, User } = require('../models');

//User Seeds
db.once('open', async () => {
  await Dog.deleteMany({});
  await User.deleteMany({});
  // create user data
  const userData = [];
  for (let i = 0; i < 20; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    userData.push({ username, email, password });
  }
  const createdUsers = await User.collection.insertMany(userData);

  const dogData = [
    {
      name: 'Kaley',
      breed: 'Husky',
      gender: 'Female',
      age: 4
   
    },
    {
      name: 'Wiggles',
      breed: 'English Bulldog',
      gender: 'Male',
      age: 1
    },
    {
      name: 'Hank',
      breed: 'German Shepherd',
      gender: 'Male',
      age: 3
    },
    {
      name: 'Zena',
      breed: 'Poodle',
      gender: 'Female',
      age: 1
    },
    {
      name: 'Bucky',
      breed: 'Labrador Mix',
      gender: 'Male',
      age: 2
    },
    {
      name: 'Parker',
      breed: 'Pomeranian',
      gender: 'Male',
      age: 4
    },
    {
      name: 'Tiggy',
      breed: 'Jack Russell mix',
      gender: 'Female',
      age: 5
    },
    {
      name: 'Luna',
      breed: 'Goldendoodle',
      gender: 'Female',
      age: 1
    },
    {
      name: 'Pyro',
      breed: 'Doberman',
      gender: 'Male',
      age: 3
    },
    {
      name: 'Blue',
      breed: 'Golden Retriever',
      gender: 'Male',
      age: 6
    },
    {
      name: 'Sullivan',
      breed: 'Bernese Mountain Dog',
      gender: 'Male',
      age: 3
    },
    {
      name: 'Daisy',
      breed: 'Saint Benard',
      gender: 'Female',
      age: 6
    }
  ]

  const seedDogs = await Dog.collection.insertMany(dogData);

  const dogImages = [{
    link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80',
  }]

  const seedImages = await Dog.collection.insertMany(dogImages);
  
  
  
  console.log(createdUsers);
  console.log(seedDogs)
  console.log(seedImages)
  process.exit(0);
})



