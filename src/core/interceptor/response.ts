import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { BizResponse, RES_CODE } from '../entity/response'
import { CustomLogger } from '../middleware/logger/factory'

/** TODO: 全局响应拦截器 */
@Injectable()
export class ResInter<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<BizResponse<T>> {
    const req = context.getArgByIndex(1).req
    return next.handle().pipe(
      map((data) => {
        const logFormat = {
          httpType: 'Response',
          ip: req.headers?.remoteip
            ? String(req.headers.remoteip)
            : req.ip.split(':').pop(),
          reqUrl: `${req.headers.host}${req.originalUrl}`,
          reqMethod: req.method,
          params: req.params,
          query: req.query,
          body: req.body,
          data: data,
        }
        CustomLogger.access(JSON.stringify(logFormat))
        return new BizResponse(RES_CODE.OK, 'success', data)
      }),
    )
  }
}
