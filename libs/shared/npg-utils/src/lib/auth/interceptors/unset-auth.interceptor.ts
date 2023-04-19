import { ExecutionContext, Injectable } from '@nestjs/common';

import { UnsetAuthInterceptor as UnsetAuthInterceptorNest } from '@kkitron/shared/nest-utils';
import { getRequest, getResponse } from '../utils';

@Injectable()
export abstract class UnsetAuthInterceptor extends UnsetAuthInterceptorNest {
  getRequest(context: ExecutionContext) {
    return getRequest(context);
  }

  getResponse(context: ExecutionContext) {
    return getResponse(context);
  }
}
