import {
  createClient,
  fetchExchange,
  SSRData,
  ssrExchange,
  TypedDocumentNode,
} from 'urql';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { DocumentNode } from 'graphql';

import { authExchange, TokenStorage } from './auth-exchange';

type SsrResult = GetServerSidePropsResult<{ urqlState?: SSRData, token?: string }>;
type SsrQuery<D, V> = DocumentNode | TypedDocumentNode<D, V> | string;
type SsrContext = GetServerSidePropsContext;

export async function serverQuery<
  QueryResult = { [key: string]: unknown },
  Variables = { [key: string]: unknown }
>(
  query: SsrQuery<QueryResult, Variables>,
  variables?: Variables,
  context?: SsrContext
): Promise<SsrResult> {
  const ssrCache = ssrExchange({ isClient: false });
  const cookie = context.req.headers.cookie;
  const serverClient = createClient({
    url: process.env.KKITRON_API_URL,
    fetchOptions: { headers: { cookie } },
    exchanges: [
      ssrCache,
      authExchange,
      fetchExchange,
    ],
  });

  try {
    const { error } = await serverClient
      .query<SsrQuery<QueryResult, Variables>, Variables>(query, variables)
      .toPromise();

    if (!error) {
      return {
        props: {
          urqlState: ssrCache.extractData(),
          token: TokenStorage.get(),
        },
      };
    }

    return { redirect: { permanent: false, destination: '/login' } };
  } catch (error) {
    console.log('server side query unexpected error', error);
  }

  return { redirect: { permanent: false, destination: '/error' } };
}
