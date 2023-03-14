import { createBrowserRouter } from 'react-router-dom';
import { Root } from './root';
import { LogIn } from './log-in';
import { SignUp } from './sign-up/sign-up';

export enum ROUTES {
  ROOT = '/',
  SIGN_UP = '/sign-up',
  LOG_IN = '/log-in',
};

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Root />,
    children: [
      {
        path: ROUTES.LOG_IN,
        element: <LogIn />,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <SignUp />,
      },
    ],
  }
]);
