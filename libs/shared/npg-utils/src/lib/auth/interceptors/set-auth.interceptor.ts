import { ExecutionContext, Injectable } from '@nestjs/common';

import { SetAuthInterceptor as SetAuthInterceptorNest } from '@kkitron/shared/nest-utils';
import { getRequest, getResponse } from '../utils';

@Injectable()
export abstract class SetAuthInterceptor<U> extends SetAuthInterceptorNest<U> {
  protected abstract inputId: string;

  getRequest(context: ExecutionContext) {
    return getRequest(context, this.inputId);
  }

  getResponse(context: ExecutionContext) {
    return getResponse(context);
  }
}
