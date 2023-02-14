//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  env: {
    // TODO: do something with it
    KKITRON_API_URL: `${process.env.KKITRON_OAUTH_API_PROTOCOL}://${process.env.KKITRON_OAUTH_API_HOST}:${process.env.KKITRON_OAUTH_API_PORT}/graphql`,
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

module.exports = withNx(nextConfig);
