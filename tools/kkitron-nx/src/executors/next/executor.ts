import { ExecutorContext } from '@nrwl/devkit';
import serve from '@nrwl/next/src/executors/server/server.impl';
import { NextServeBuilderOptions } from '@nrwl/next/src/utils/types';

/**
 * This executor runs next dev server with a port specified in the env file
 */
export default async function* runExecutor(
  options: NextServeBuilderOptions & { portEnv: string },
  context: ExecutorContext,
) {
  options.port = process.env[options.portEnv]
    ? parseInt(process.env[options.portEnv])
    : options.port ?? 4200;
  for await (const output of serve(options, context)) {
    yield output;
  }
}
