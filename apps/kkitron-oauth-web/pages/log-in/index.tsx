import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/router';

import { Header } from '../../components';

import { withApi } from '../../api/client-api';
import { useLogInMutation } from '../../api/auth/auth.gql.gen';
import { TokenStorage } from '../../api/auth-exchange';

import styles from './index.module.scss';

export const LogInPage = () => {
  const loginRef = useRef('');
  const passwordRef = useRef('');
  const [, logIn] = useLogInMutation();
  const router = useRouter();

  const setLogin = (value: string) => {
    loginRef.current = value;
  };

  const setPassword = (value: string) => {
    passwordRef.current = value;
  };

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { current: login } = loginRef;
    const { current: password } = passwordRef;
    const result = await logIn({ args: { login, password } });
    if (result.data.logIn.token) {
      TokenStorage.store(result.data.logIn.token);
      router.push('/');
    }
  }

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <Header withoutLogout />
          <form
            className={styles['form-group']}
            onSubmit={submitLogin}
          >
            <label htmlFor="login">Login</label>
            <input
              id="login"
              onChange={event => setLogin(event.target.value)}
            />

            <hr />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
            />

            <hr />

            <button type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withApi(LogInPage);
