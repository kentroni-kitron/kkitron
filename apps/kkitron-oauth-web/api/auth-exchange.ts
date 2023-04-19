import { authExchange as authExchangeUrql } from '@urql/exchange-auth';

import { isAuthError } from './shared';
import { REFRESH } from './auth/auth.gql';

export class TokenStorage {
  private static token: string | null = null;

  static store = (token: string) => {
    TokenStorage.token = token;
  };

  static get = () => TokenStorage.token;

  static remove = () => TokenStorage.token = null;
}

export const authExchange = authExchangeUrql(async utils => {
  return {
    addAuthToOperation(operation) {
      const token = TokenStorage.get();
      if (!token) {
        return operation;
      }

      return utils.appendHeaders(operation, {
        'Authorization': `Bearer ${token}`,
      });
    },
    didAuthError(error, _operation) {
      return isAuthError(error);
    },
    async refreshAuth() {
      const result = await utils.mutate(REFRESH, {});
      TokenStorage.store(result.data?.refresh?.token ?? null);
    },
  };
});
