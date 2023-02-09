import { FC } from 'react';
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';

export const clientApi = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [
    cacheExchange,
    fetchExchange,
  ],
});

export const withApi = (Component: FC) => {
  return function ApiWrappedComponent({ ...properties }) {
    return (
      <Provider value={clientApi}>
        <Component {...properties} />
      </Provider>
    )
  };
};
