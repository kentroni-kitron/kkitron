import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { Header } from '../../components';

import { withApi } from '../../api/client-api';
import { useLoginMutation } from '../../api/auth/auth.gql.gen';


import styles from './index.module.scss';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, login] = useLoginMutation();
  const router = useRouter();

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ args: { email, password } });
    router.push('/');
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <hr />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
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

export default withApi(LoginPage);
