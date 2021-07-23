// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Query {
    helloWorld: String
    me: User
    user(username: String!): User
    dogs(username:String!): Dog
    dog(_id: ID): Dog
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, city: String): Auth
    updateUser(_id: ID, username: String!, email: String!, password: String!, city: String): Auth
    deleteUser(email: String!, password: String!): Auth
    addDog(username: String, name: String, gender: String, breed: String, age: Int): Dog
    updateDog(_id: ID, name: String, gender: String, breed: String, age: Int): Dog
    removeDog(_id: ID): Dog
    addImage(link: String!, caption: String, username: String!): Image
    deleteImage(_id: ID): Image
    addComment(commentText: String!, username: String!): Comment
    deleteComment(_id: ID): Comment 
    addReply(_id: ID, username: String!): Comment
    deleteReply(_id: ID): Comment
  }
  type Dog{
    _id: ID
    name: String
    breed: String
    gender: String
    owner: ID
    age: Int
    friends: [Dog]
    images: [Image]
  }
  type User{
    _id: ID
    username: String
    email: String
    password: String
    city: String
    dogs: [Dog]
  }
  type Image{
    _id: ID
    link: String
    caption: String
    comments: [ Comment]
    username: String
  }
  type Comment{
    _id: ID
    commentText: String
    replies: [String]
    createdAt: String
    username: String
  }
  type Auth{
    token: ID!
    user: User
  }
  

`;
module.exports = typeDefs;

// one to many relationships in NoSQL: https://stackoverflow.com/questions/41243522/nosql-data-modeling-about-one-to-many-relationships