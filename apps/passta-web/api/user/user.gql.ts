import { gql } from 'urql';

const GET_USER = gql`
  query GetUser ($id: String!){
    user(id: $id){
      id
      email
      firstName
      lastName
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
    }
  }
`;
