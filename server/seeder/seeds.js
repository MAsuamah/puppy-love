const faker = require('faker');
const db = require('../config/connection');
const { Dog, User, } = require('../models');


db.once('open', async () => {
  await Dog.deleteMany({});
  await User.deleteMany({});
  // create user data
  const userData = [];
  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    userData.push({ username, email, password });
  }
  const createdUsers = await User.collection.insertMany(userData);
  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: dogId } = createdUsers.ops[randomUserIndex];
    let friendId = dogId;
    while (friendId === dogId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }
    await Dog.updateOne({ _id: dogId }, { $addToSet: { friends: friendId } });
  }
  // create dogs
  let createdDogs = [];
  for (let i = 0; i < 100; i += 1) {
    const name = faker.name.firstName;
    const breed = faker.animal.dog();
    const gender = faker.randon.boolean();
    if( gender === true) {
      gender = 'female'
    } else {
      gender = 'male'
    }
    const age = faker.random.number;
    const images = faker.image.cats();
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];
    const createdDog = await Dog.create({ name, breed, gender, age, images });
    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { dogs: createdDog._id } }
    );
    createdDogs.push(createdDog);
  }
})

  /*
  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];
    const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
    const { _id: thoughtId } = createdThoughts[randomThoughtIndex];
    await Thought.updateOne(
      { _id: thoughtId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }
  */
  console.log('all done!');
  process.exit(0);
});
