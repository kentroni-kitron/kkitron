import { FastifyRequest } from 'fastify';
import uid from 'uid2';

export class PKCESessionStore {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  store(
    request: FastifyRequest,
    verifier: string,
    state: string,
  ): string {
    if (!request.session) {
      throw new Error('No session');
    }

    let stateObject: { [key: string]: string } = {};
    try {
      stateObject = JSON.parse(state);
    } catch (_e) { /* continue */ }

    stateObject.handle = uid(24);
    stateObject['code_verifier'] = verifier;

    request.session.set(this.key, stateObject);

    return JSON.stringify(stateObject);
  }

  verify(
    request: FastifyRequest,
    providedState: string,
  ): {
    verifier: string | null;
    state: string | null;
    error: string | null;
  } {
    if (!request.session) {
      throw new Error('No session');
    }

    const getErrorObject = (message: string) => ({
      verifier: null,
      state: null,
      error: message,
    });

    const session = request.session.get(this.key) as { [key: string]: any };

    try {
      const parsedProvidedState = JSON.parse(providedState);
      if (
        session.handle !== parsedProvidedState.handle ||
        session['code_verifier'] !== parsedProvidedState['code_verifier']
      ) {
        return getErrorObject('Invalid authorization request state');
      }

      return {
        verifier: session['code_verifier'],
        state: session.state,
        error: null,
      };
    } catch (_e) {
      return getErrorObject('Unable to verify authorization request state');
    }
  }
}
