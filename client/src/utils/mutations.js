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
mutation updateUser($id: ID, $username: String!, $email: String!, $password: String!, $city: String) {
  updateUser(_id: $id, username: $username, email: $email, password: $password, city: $city) {
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
  }
}
`;

export const ADD_IMAGE = gql`
  mutation addImage($id: ID, $link: String!, $caption: String!) {
    addImage(id: $id, link: $link, caption: $caption!) {
      image {
        _id
        link
        caption
      }
    }
  }
`;

export const UPDATE_IMAGE_CAPTION = gql`
  mutation updateImageCaption($id: ID, caption: $caption!) {
    updateImageCaption(_id: $id, caption: $caption!) {
        image {
            _id
            link
            caption
            }
        }
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation deleteImage($id: ID) {
    deleteImage(_id: $id) {
      image {
        _id
        link
        caption
        }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($id: ID, $commentText: String!, $username: String!) {
    addComment(_id: $id, commentText: $commentText, username: $username) {
      comment {
        _id
        commentText
        }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID) {
    deleteComment(_id: $id) {
      comment {
        _id
        commentText
        }
    }
  }
`;