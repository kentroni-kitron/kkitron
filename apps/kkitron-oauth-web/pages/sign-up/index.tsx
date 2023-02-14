import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { withApi } from '../../api/client-api';
import { useSignUpMutation } from '../../api/auth/auth.gql.gen';
import styles from './index.module.scss';

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, signUp] = useSignUpMutation();
  const router = useRouter();

  const submitSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await signUp({ args: { email, password } })
    console.log('result: ', result);
    router.push('/');
  }

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <form
            onSubmit={submitSignUp}
            className="form-group"
            style={{ display: 'flex', flexDirection: 'column' }}
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

            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withApi(SignUpPage);
