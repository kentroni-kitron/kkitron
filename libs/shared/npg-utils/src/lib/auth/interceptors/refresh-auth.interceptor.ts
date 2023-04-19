import { ExecutionContext, Injectable } from '@nestjs/common';

import { RefreshAuthInterceptor as RefreshAuthInterceptorNest } from '@kkitron/shared/nest-utils';
import { getRequest, getResponse } from '../utils';

@Injectable()
export abstract class RefreshAuthInterceptor<U> extends RefreshAuthInterceptorNest<U> {
  getRequest(context: ExecutionContext) {
    return getRequest(context);
  }

  getResponse(context: ExecutionContext) {
    return getResponse(context);
  }
}
