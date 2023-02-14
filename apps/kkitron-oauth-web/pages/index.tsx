import { GetServerSidePropsContext } from 'next';

import { withApi } from '../api/client-api';
import {
  GetOAuthClientsDocument,
  useGetOAuthClientsQuery,
} from '../api/oauth-client/oauth-client.gql.gen';
import { serverQuery } from '../api/server-api';
import styles from './index.module.scss';

// export const getServerSideProps = (context: GetServerSidePropsContext) => {
//   return serverQuery(GetOAuthClientsDocument, {}, context);
// };

export function Index() {
  const [data] = useGetOAuthClientsQuery();

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          Hi, <a href="/login">login</a>, or <a href="/sign-up">sign up</a>!
        </div>
        {!data.fetching && (<div className="request-result">
          <pre>{JSON.stringify(data)}</pre>
        </div>)}
      </div>
    </div>
  );
}

export default withApi(Index);
