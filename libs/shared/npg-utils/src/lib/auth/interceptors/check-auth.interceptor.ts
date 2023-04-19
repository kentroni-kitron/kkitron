import { ExecutionContext, Injectable } from '@nestjs/common';

import { CheckAuthInterceptor as CheckAuthInterceptorNest } from '@kkitron/shared/nest-utils';
import { getRequest, getResponse } from '../utils';

@Injectable()
export abstract class CheckAuthInterceptor<U> extends CheckAuthInterceptorNest<U> {
  getRequest(context: ExecutionContext) {
    return getRequest(context);
  }

  getResponse(context: ExecutionContext) {
    return getResponse(context);
  }
}