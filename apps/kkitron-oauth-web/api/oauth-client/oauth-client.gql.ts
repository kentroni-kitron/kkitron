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
      redirectUris { id uri }
      scopes { id name }
    }
  }
`;

const CREATE_OAUTH_CLIENT = gql`
  mutation CreateOAuthClient ($args: OAuthClientCreateInput!) {
    createOAuthClient(oAuthClientCreateInput: $args) {
      id
      name
    }
  }
`;
