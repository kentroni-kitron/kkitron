export type JwtServiceOptionsAbstract = {
  secret?: string | Buffer,
  privateKey?: string | Buffer,
  expiresIn?: number | string,
};

export type JwtServiceAbstract = {
  sign: (
    payload: string | object | Buffer,
    options?: JwtServiceOptionsAbstract,
  ) => string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verify: <T extends object = any>(token: string, options?: JwtServiceOptionsAbstract) => T,
};

