import { gql } from 'urql';

const SIGN_UP = gql`
  mutation SignUp($args: LoginInput!) {
    signUp(signUpInput: $args) {
      id
      email
    }
  }
`;

const LOGIN = gql`
  mutation Login($args: LoginInput!) {
    login(loginInput: $args) {
      id
      email
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
