import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { BizResponse, RES_CODE } from '../entity/response'

/** TODO: 全局响应拦截器 */
@Injectable()
export class ResInter<T> implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<BizResponse<T>> {
    return next
      .handle()
      .pipe(map((data) => new BizResponse(RES_CODE.SUCCESS, 'success', data)))
  }
}
