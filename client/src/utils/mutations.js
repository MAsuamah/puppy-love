import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $city: String) {
    addUser(username: $username, email: $email, password: $password, city: $city) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($email: String!, $password: String!, $city: String) {
    updateUser(email: $email, password: $password, city: $city) {
      token
      user {
        _id
        username
        email
        city
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID, $password: String!) {
    deleteUser(_id: $id, password: $password) {
      token
      user{
        username
      }
    }
  }
`;

export const ADD_DOG = gql`
  mutation addDog($name: String!, $gender: String, $breed: String, $age: Int) {
    addDog(name: $name, gender: $gender, breed: $breed, age: $age) {
        _id
        name
        username
        breed
        gender
        age
    }
  }
`;

export const UPDATE_DOG = gql`
  mutation updateDog($id: ID, $name: String!, $gender: String, $breed: String, $age: Int) {
    updateDog(_id: $id, name: $name, gender: $gender, breed: $breed, age: $age) {
        _id
        name
        username
        breed
        gender
        age
    }
  }
`;

export const DELETE_DOG = gql`
  mutation deleteEDog($id: ID) {
    deleteDog(_id: $id) {
      username
      dogs{
        _id
        name
      }
    }
  }
`;

export const ADD_IMAGE = gql`
  mutation addImage($id: ID, $name: String!, $link: String!, $caption: String!) {
    addImage(_id: $id, name: $name, link: $link, caption: $caption) {
        _id
        link
        caption
        createdAt
    }
  }
`;

export const UPDATE_IMAGE_CAPTION = gql`
  mutation updateImageCaption($id: ID, $caption: String!) {
    updateImageCaption(_id: $id, caption: $caption) {
            _id
            link
            caption
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation deleteImage($id: ID, $dogId: ID) {
    deleteImage(_id: $id, dogId: $dogId) {
        _id
        images{
          _id
          name
        }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($id: ID, $commentText: String!) {
    addComment(_id: $id, commentText: $commentText) {
        _id
      commentText
      createdAt
      username
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID, $imageId: ID) {
    deleteComment(_id: $id, imageId: $imageId) {
      comment {
        _id
        commentText
        }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($user1: ID, $user2: ID) {
    addFriend(user1: $user1, user2: $user2) {
        _id
        username
        friends{
          username
        }
    }
  }
`;

export const REMOVE_FRIEND = gql`
mutation removeFriend($user1: ID, $user2: ID) {
  removeFriend(user1: $user1, user2: $user2) {
      _id
      username
      friends{
        username
      }
  }
}
`;