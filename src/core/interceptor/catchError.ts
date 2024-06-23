// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { /*Request*/ Response } from 'express'
import { BizResponse, RES_CODE } from '../entity/response'
import { CustomLogger } from '../middleware/logger/factory'

/** TODO: 全局错误捕捉拦截器 */
@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : RES_CODE.SERVER_ERROR

    const error_info = exception.response ? exception.response : exception
    const error_data = exception.response?.data ? exception.response.data : {}
    const error_msg = exception.response
      ? exception.response.message
        ? exception.response.message
        : exception.response.errorMsg
      : '系统异常'
    const error_code = exception.response?.errorCode
      ? exception.response.errorCode
      : RES_CODE.SERVER_ERROR

    const data = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      reqUrl: req.originalUrl,
      reqMethod: req.method,
      httpCode: status,
      params: req.params,
      query: req.query,
      body: req.body,
      statusCode: error_code,
      errorMsg: error_msg,
      errorData: error_data,
      errorInfo: error_info,
    }

    if (status === HttpStatus.NOT_FOUND) {
      data.errorMsg = `资源不存在! 接口 ${req.method} -> ${req.url} 无效!`
    }
    CustomLogger.error(data)
    res.status(status).json(new BizResponse(status, error_msg))
  }
}
