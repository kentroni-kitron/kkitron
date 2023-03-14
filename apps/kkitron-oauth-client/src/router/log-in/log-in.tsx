import { FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card } from '@kkitron/shared/ui/lib/card';
import { Input } from '@kkitron/shared/ui/lib/input';
import { Button } from '@kkitron/shared/ui/lib/button';

import { ROUTES } from '../router';
import './log-in.scss';

export function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!username) {
      setUsernameError('Field is required');
    }

    if (!password) {
      setPasswordError('Field is required');
    }

    if (username && password) {
      setIsLoading(true);
    }
  };

  const curryResetErrors = (func: (value: string) => void) => {
    return (value: string) => {
      setUsernameError('');
      setPasswordError('');

      func(value);
    };
  };

  return (
    <div className="log-in">
      <form onSubmit={handleSubmit}>
        <Card className="log-in__card" title="Log in into Passta">
          <Input
            id="log_in_username"
            label="Login"
            placeholder="email@domain.com"
            value={username}
            error={usernameError}
            setValue={curryResetErrors(setUsername)}
            className="w-full my-4"
          />
          <Input
            id="log_in_password"
            label="Password"
            type="password"
            placeholder="************"
            value={password}
            error={passwordError}
            setValue={curryResetErrors(setPassword)}
            className="w-full mb-4"
          />
          <Button
            type="submit"
            disabled={Boolean(usernameError || passwordError)}
            loading={isLoading}
            className="w-full my-4"
          >Sign up</Button>
          <span className="capitalize">Or <Link className="underline" to={ROUTES.SIGN_UP}>sign up</Link></span>
        </Card>
      </form>
    </div>
  );
};
