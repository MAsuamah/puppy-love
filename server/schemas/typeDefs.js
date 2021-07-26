// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  type Query {
    helloWorld: String
    me: User
    user(username:String): User
    allUsers:[User]
    dog(_id: ID): Dog
    dogs:[Dog]
    allDogs:[Dog]
    image(_id: ID): Image
    images: [Image]
    allImages: [Image]
    comments: [Comment]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, city: String): Auth
    updateUser(_id: ID, username: String!, email: String!, password: String!, city: String): Auth
    deleteUser(_id: ID, password: String!): Auth
    addDog(name: String!, gender: String, breed: String, age: Int): Dog
    updateDog(_id: ID, name: String, gender: String, breed: String, age: Int): Dog
    deleteDog(_id: ID): User
    addImage( _id: ID, name: String!, link: String!, caption: String): Image
    updateImageCaption(_id: ID, caption: String!): Image
    deleteImage(_id: ID, dogId: ID): Dog
    addComment(_id: ID, commentText: String!): Comment
    deleteComment(_id: ID, imageId: ID): Image 
  }
  type Dog{
    _id: ID
    name: String
    breed: String
    gender: String
    age: Int
    username: String
    friends: [Dog]
    images: [Image]
    friendCount: Int
    imageCount: Int
  }
  type User{
    _id: ID
    username: String
    email: String
    password: String
    city: String
    dogs: [Dog]
    dogCount: Int
  }
  type Image{
    _id: ID
    name: String
    caption: String
    link: String
    createdAt: Date
    comments: [Comment]
    commentCount: Int
  }
  type Comment{
    _id: ID
    commentText: String
    createdAt: Date
    username: String
    replies: [String]
    repliesCount: Int
  }
  type Auth{
    token: ID!
    user: User
  }
`;
module.exports = typeDefs;

// one to many relationships in NoSQL: https://stackoverflow.com/questions/41243522/nosql-data-modeling-about-one-to-many-relationships