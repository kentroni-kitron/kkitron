import { gql } from 'urql';

const SIGN_UP = gql`
  mutation SignUp($args: LogInInput!) {
    signUp(signUpInput: $args) {
      id
      email
    }
  }
`;

const LOGIN = gql`
  mutation Login($args: LogInInput!) {
    login(logInInput: $args) {
      user { id, email }
      token
      tokenExpires
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const REFRESH = gql`
  mutation Refresh {
    refresh {
      user { id, email }
      token
      tokenExpires
    }
  }
`;
