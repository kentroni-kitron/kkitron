import { gql } from 'urql';

const CREATE_OAUTH_SCOPE = gql`
  mutation CreateOAuthScope ($args: OAuthScopeCreateInput!) {
    createOAuthScope(oAuthScopeCreateInput: $args) {
      id
      name
    }
  }
`;
