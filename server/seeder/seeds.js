const { image } = require('faker');
const faker = require('faker');
const db = require('../config/connection');
const { Dog, User, Image } = require('../models');

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

  //Seed Dog Images

  const dogImages = [
    {
      link:'https://unsplash.com/photos/6kVGGzSHWKM'
    },
    {
      link:'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2VybWFuJTIwc2hlcGhlcmQlMjBkb2d8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    },
    {
      link:'https://images.unsplash.com/photo-1574273443477-87bf272e5100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80'
    }
  ]
   const createdDogImages = await Image.collection.insertMany(dogImages);


  const dogData = [
    {
      name: 'Kaley',
      breed: 'Husky',
      gender: 'Female',
      age: 1,
    },
    {
      name: 'Wiggles',
      breed: 'English Bulldog',
      gender: 'Male',
      age: 1,
    },
    {
      name: 'Hank',
      breed: 'German Shepherd',
      gender: 'Male',
      age: 3,
    },
    {
      name: 'Zena',
      breed: 'Poodle',
      gender: 'Female',
      age: 1,
    },
    {
      name: 'Bucky',
      breed: 'Labrador Mix',
      gender: 'Male',
      age: 2,
    },
    {
      name: 'Parker',
      breed: 'Pomeranian',
      gender: 'Male',
      age: 4,
    },
    {
      name: 'Tiggy',
      breed: 'Jack Russell mix',
      gender: 'Female',
      age: 5,
    },
    {
      name: 'Luna',
      breed: 'Goldendoodle',
      gender: 'Female',
      age: 1,
    },
    {
      name: 'Pyro',
      breed: 'Doberman',
      gender: 'Male',
      age: 3,
    },
    {
      name: 'Blue',
      breed: 'Golden Retriever',
      gender: 'Male',
      age: 6,
    },
    {
      name: 'Sullivan',
      breed: 'Bernese Mountain Dog',
      gender: 'Male',
      age: 3,
    },
    {
      name: 'Daisy',
      breed: 'Saint Benard',
      gender: 'Female',
      age: 6,
    }
  ]

  const createdDogs = await Dog.collection.insertMany(dogData);

  const updatedDog = await Dog.updateMany(
    {},
    { $push: { images: createdDogImages.ops } }
  );

 
  console.log(createdUsers);
  console.log(createdDogImages) 
  console.log(createdDogs)
  console.log(updatedDog)  

  process.exit(0);
})




