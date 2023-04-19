import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants';
import * as Routes from '../routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Routes.Root />,
    children: [
      {
        path: ROUTES.LOG_IN,
        element: <Routes.LogIn />,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <Routes.SignUp />,
      },
    ],
  }
]);
