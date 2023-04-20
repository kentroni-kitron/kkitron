import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/router';

import { Header } from '../../components';

import { withApi } from '../../api/client-api';
import { useLoginMutation } from '../../api/auth/auth.gql.gen';
import { TokenStorage } from '../../api/auth-exchange';

import styles from './index.module.scss';

export const LogInPage = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [, login] = useLoginMutation();
  const router = useRouter();

  const setEmail = (value: string) => {
    emailRef.current = value;
  };

  const setPassword = (value: string) => {
    passwordRef.current = value;
  };

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { current: email } = emailRef;
    const { current: password } = passwordRef;
    const result = await login({ args: { email, password } });
    if (result.data.login.token) {
      TokenStorage.store(result.data.login.token);
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={event => setEmail(event.target.value)}
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
