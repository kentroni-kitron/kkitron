import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { withApi } from '../api/client-api';
import { GetOAuthClientsDocument } from '../api/oauth-client/oauth-client.gql.gen';
import { serverQuery } from '../api/server-api';

import Header from '../components/header/header';

import styles from './index.module.scss';

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return serverQuery(GetOAuthClientsDocument, {}, context);
};

export function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <Header />
          <h2>Menu</h2>
          <ul>
            <li><Link href="/oauth-clients">OAuth Clients</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withApi(Index);
