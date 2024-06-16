import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

/** TODO: 日志中间件 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(' === logger中间件 === ')
    Logger.log(` === logger中间件 === ${req.url}`)
    next()
  }
}
