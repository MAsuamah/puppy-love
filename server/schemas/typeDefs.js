// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    address: String
    pets: [Pet]
  }
  type Pet {
    _id: ID
    name: String
    breed: String
    gender: String
    age: Int
    friends: [Pet]
    images: [Image]
    dates: [Date!]
  }
  type Dates {
    _id: ID
    daters: [Pet!]
    day: String
  }
  type Image{
    _id: ID
    link: String
    comments: [String]
  }
  type Comment{
    _ID: id
    userId: ID
  }
  type Query {
    helloWorld: String
    me: User
    user(_id: ID!): User
    date(_id: ID!, pet1: ID, pet2: ID): Date
    pet(_id: ID!, name: String): Pet
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email. String!, username: String!, password: String!, address: String, pets: [Pet]): Auth
    addPet(name: String, breed: String, gender: String, age: Int )
  }
`;
module.exports = typeDefs;

// one to many relationships in NoSQL: https://stackoverflow.com/questions/41243522/nosql-data-modeling-about-one-to-many-relationships