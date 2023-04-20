import { gql } from 'urql';

const SIGN_UP = gql`
  mutation SignUp($args: LogInInput!) {
    signUp(signUpInput: $args) {
      id
      login
    }
  }
`;

const LOGIN = gql`
  mutation LogIn($args: LogInInput!) {
    logIn(logInInput: $args) {
      user { id, login }
      token
      tokenExpires
    }
  }
`;

const LOGOUT = gql`
  mutation LogOut {
    logOut
  }
`;

export const REFRESH = gql`
  mutation Refresh {
    refresh {
      user { id, login }
      token
      tokenExpires
    }
  }
`;
