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
      }
    }
  }
  `;

  export const GET_DOGS = gql`
{
    me {
      _id
      dogs {
        _id
        name
        breed
        gender
        age
        friends {

        }
        images {
            
        }
      }
    }
  }
  `;