import gql from 'graphql-tag';

export const GET_ME = gql`
{
  me {
    _id
    username
    email
    city
    dogs {
        _id
        name
        breed
        gender
        age
    }
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!){
    user(username: $username){
      _id
      username
      email
      city
      dogs {
        _id
        name
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  {
    allUsers {
      _id
      username
      email
      city
      dogs {
        _id
        name
      }
    }
  }
`;

export const GET_MY_DOGS = gql`
  {
    me {
      _id
      dogs {
        _id
        name
        breed
        gender
        age
        friends
        images
      }
    }
  }
`;
export const GET_SNGLE_DOG = gql `
  query dog($_id: ID!){
    dog(_id: $id){
      _id
      name
      breed
      gender
      age
      friends {
          _id
          name
      }
      friendCount
      images{
          _id
          link
          caption
          commentCount
      }
    }
  }
`;

export const GET_ALL_DOGS = gql`
  {
    allDogs{
      _id
      name
      breed
      gender
      age
      friends {
          _id
          name
      }
      friendCount
      images{
          _id
          link
          caption
          commentCount
      }
    }
  }
`;



export const GET_DOG_IMAGE = gql`
  query image ($_id: ID!){
    image(_id: $id){
      _id
      link
      caption
      comments{
        _id
        commentText
        createdAt
        replies
        repliesCount
      }
      createdAt
    }
  }
`;

export const GET_DOG_IMAGES = gql `
  {
    images{
      _id
      link
      caption
      comments{
        _id
        commentText
        createdAt
        replies
        repliesCount
      }
      createdAt
    }
  }
`;

export const GET_COMMENTS = gql `
  {
    comments{
      _id
      commentText
      createdAt
      username
      replies
      repliesCount
    }
  }
`;

