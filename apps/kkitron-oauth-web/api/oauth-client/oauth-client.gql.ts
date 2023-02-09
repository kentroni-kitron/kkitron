import { gql } from 'urql';

const GET_OAUTH_CLIENT = gql`
  query GetOAuthClient ($id: Int!){
    oAuthClient(id: $id){
      id
      name
    }
  }
`;

const GET_OAUTH_CLIENTS = gql`
  query GetOAuthClients {
    oAuthClients {
      id
      name
    }
  }
`;
