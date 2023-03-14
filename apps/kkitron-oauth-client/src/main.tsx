import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import '@kkitron/shared/styles';

import { router } from './router';

document.body.classList.add('theme-dark');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <main>
      <RouterProvider router={router} />
    </main>
  </StrictMode>
);
