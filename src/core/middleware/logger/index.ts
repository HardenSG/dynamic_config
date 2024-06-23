import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { CustomLogger } from './factory'

/** TODO: 日志中间件 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(' === logger中间件 === ')
    // Logger.log(` === logger中间件 === ${req.url}`)
    // next()

    next()

    /* 组装日志信息 */
    const logFormat = {
      httpType: 'Request',
      ip: req.headers?.remoteip
        ? String(req.headers.remoteip)
        : req.ip.split(':').pop(),
      reqUrl: `${req.headers.host}${req.originalUrl}`,
      reqMethod: req.method,
      httpCode: res.statusCode,
      params: req.params,
      query: req.query,
      body: req.body,
    }
    Logger.log(` === logger中间件 === ${req.url}`)

    // 根据状态码，进行日志类型区分
    if (res.statusCode >= 400) {
      CustomLogger.error(JSON.stringify(logFormat))
    } else {
      CustomLogger.access(JSON.stringify(logFormat))
    }
  }
}
