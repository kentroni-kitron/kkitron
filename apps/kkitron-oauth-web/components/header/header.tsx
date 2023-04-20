import { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { withApi } from '../../api/client-api';
import { useLogOutMutation } from '../../api/auth/auth.gql.gen';
import { TokenStorage } from '../../api/auth-exchange';

import styles from './header.module.scss';

const Header = ({ withoutLogout = false }) => {
  const [, logOut] = useLogOutMutation();
  const router = useRouter();

  const handleLogout = async (event: MouseEvent) => {
    event.preventDefault();

    await logOut({});
    await fetch('/api/log-out');
    TokenStorage.remove();

    router.push('/log-in')
  };

  return (
    <div className={styles.header}>
      <span>KKitron OAuth</span>
      {!withoutLogout && <Link href="#" onClick={handleLogout}>Log out</Link>}
    </div>
  );
};

export default withApi(Header);
