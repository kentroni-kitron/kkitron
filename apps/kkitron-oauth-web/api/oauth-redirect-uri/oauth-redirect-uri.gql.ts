import { gql } from 'urql';

const CREATE_OAUTH_REDIRECT_URI = gql`
  mutation CreateOAuthRedirectUri ($args: OAuthRedirectUriCreateInput!) {
    createOAuthRedirectUri(oAuthRedirectUriCreateInput: $args) {
      id
      uri
    }
  }
`;
