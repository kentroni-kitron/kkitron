import { NextRouter, useRouter } from 'next/router';
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
import { TokenStorage, authExchange } from './auth-exchange';

const isClient = typeof window !== 'undefined';

export const ssrCache = ssrExchange({
  isClient,
  initialState: isClient ? window['__URQL_DATA__'] : undefined
});

export const clientApi = (router: NextRouter) => createClient({
  url: process.env.KKITRON_API_URL,
  fetchOptions: { credentials: 'include' },
  exchanges: [
    cacheExchange,
    ssrCache,
    authExchange,
    errorExchange({
      onError: (error) => {
        if (isAuthError(error) && isClient) {
          router.push('/log-in');
        }
      }
    }),
    fetchExchange,
  ],
});

export const withApi = (Component: FC) => {
  return function ApiWrappedComponent({ ...properties }) {
    const router = useRouter();

    if (properties.urqlState) {
      ssrCache.restoreData(properties.urqlState);
    }

    if (properties.token) {
      TokenStorage.store(properties.token);
    }

    return (
      <Provider value={clientApi(router)}>
        <Component {...properties} />
      </Provider>
    )
  };
};
