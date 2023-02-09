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
`
