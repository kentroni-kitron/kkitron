import { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { withApi } from '../../api/client-api';
import { useLogoutMutation } from '../../api/auth/auth.gql.gen';

import styles from './header.module.scss';

const Header = ({ withoutLogout = false }) => {
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async (event: MouseEvent) => {
    event.preventDefault();

    await logout({});

    router.push('/login')
  };

  return (
    <div className={styles.header}>
      <span>KKitron OAuth</span>
      {!withoutLogout && <Link href="#" onClick={handleLogout}>Log out</Link>}
    </div>
  );
};

export default withApi(Header);
