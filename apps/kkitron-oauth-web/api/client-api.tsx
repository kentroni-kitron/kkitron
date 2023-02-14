import { FC } from 'react';
import {
  cacheExchange,
  createClient,
  errorExchange,
  fetchExchange,
  Provider,
  ssrExchange,
} from 'urql';
import { isAuthError } from './shared';

const isClient = typeof window !== 'undefined';

export const ssrCache = ssrExchange({
  isClient,
  initialState: isClient ? window['__URQL_DATA__'] : undefined
});

export const clientApi = createClient({
  url: process.env.KKITRON_API_URL,
  fetchOptions: { credentials: 'include' },
  exchanges: [
    cacheExchange,
    ssrCache,
    errorExchange({
      onError: (error) => {
        if (isAuthError(error)) {
          console.log('TODO: log out');
        }
      }
    }),
    fetchExchange,
  ],
});

export const withApi = (Component: FC) => {
  return function ApiWrappedComponent({ ...properties }) {
    if (properties.urqlState) {
      ssrCache.restoreData(properties.urqlState);
    }

    return (
      <Provider value={clientApi}>
        <Component {...properties} />
      </Provider>
    )
  };
};
