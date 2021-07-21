// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql``;

// export the typeDefs
module.exports = typeDefs;

const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;