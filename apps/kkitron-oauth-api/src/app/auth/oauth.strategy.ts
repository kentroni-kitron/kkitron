// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ParamsDictionary } from 'express-serve-static-core';
// import { Strategy } from 'passport-custom';
// import { FastifyRequest } from 'fastify';
// import * as crypto from 'crypto';

// import { isObjectGuard } from '@kkitron/shared/utils';
// import base64url from 'base64url';
// import { PKCESessionStore } from '../utils';

// import { User } from '@kkitron/kkitron-oauth-api/generated/db-types';

// export interface OAuthOptions {
//   authorizationURL: string;
//   tokenURL: string;
//   clientID: string;
//   clientSecret: string;
//   callbackURL: string;
//   scope?: string[];
//   state: { [key: string]: string | number | boolean | null };
// }

// export type OAuthVerifyCallback = (
//   request: FastifyRequest,
//   accessToken: string,
//   refreshToken: string | null,
//   profile: User | undefined,
//   done: (error: Error | null, user: User, info?: unknown) => void,
// ) => void;

// // TODO: nx generator for interfaces, dumping everything into a lib
// export const isOAuthOptions = isObjectGuard<OAuthOptions>({
//   authorizationUrl: String,
//   tokenURL: String,
//   clientID: String,
//   clientSecret: String,
//   callbackURL: String,
//   scope: { __type: [String], __required: false },
// });

// @Injectable()
// export class OAuthStrategy extends PassportStrategy(Strategy) {
//   private options: OAuthOptions;
//   private verify: OAuthVerifyCallback;
//   private store: PKCESessionStore;

//   constructor(name: string, options: OAuthOptions, verify: OAuthVerifyCallback) {
//     super(name);

//     this.options = options;
//     this.verify = verify;

//     this.store = new PKCESessionStore(`oauth:${new URL(this.options.authorizationURL).hostname}`);
//   }

//   async authenticate(
//     request: FastifyRequest,
//     options?: unknown,
//   ) {
//     if (typeof request.query === 'object' && 'error' in request.query) {
//       if (request.query.error === 'access_denied') {
//         this.fail(400);
//       }

//       return this.error(
//         new Error(`
//           ${request.query['error_description']},
//           ${request.query['error']},
//           ${request.query['error_uri']}
//         `),
//       );
//     }

//     if (!isOAuthOptions(options)) {
//       return this.fail(500);
//     }

//     const { callbackURL } = options;

//     if (typeof request.query !== 'object' || !('code' in request.query)) {
//       this.redirectToAuthorize(request, callbackURL, options);
//     } else {
//       await this.fetchToken(request, callbackURL);
//     }
//   }

//   private redirectToAuthorize(
//     request: FastifyRequest,
//     callbackURL: string,
//     options: OAuthOptions,
//   ) {
//     const verifier = base64url(crypto.pseudoRandomBytes(32));
//     const digest = crypto
//       .createHash('sha256')
//       .update(verifier)
//       .digest();

//     const params: { [key: string]: string } = {
//       'response_type': 'code',
//       'redirect_uri': callbackURL,
//       'client_id': options.clientID,
//       'code_challenge': base64url(digest),
//       'code_challenge_method': 'S256',
//       'scope': (options.scope ?? []).join(','),
//     };

//     const state = options.state?.toString() || '{}';
//   }

//   private async fetchToken(
//     request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
//     callbackURL: string,
//   ) {}
// }