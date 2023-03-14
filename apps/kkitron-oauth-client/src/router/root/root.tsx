import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../router';

import './root.scss';

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === ROUTES.ROOT) {
      navigate(ROUTES.LOG_IN, { replace: true });
    }
  });

  return (
    <>
      {/* <Navigate to="/sign-up" replace={true} /> */}
      <Outlet />
    </>
  );
};
