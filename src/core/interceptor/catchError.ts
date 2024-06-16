import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { /*Request*/ Response } from 'express'
import { BizResponse, RES_CODE } from '../entity/response'

const ERROR_CODE_MAP = {
  SyntaxError: RES_CODE.SER_ERROR,
  CustomError: RES_CODE.SER_ERROR,
  PassError: RES_CODE.PASS_ERROR,
}
/** TODO: 全局错误捕捉拦截器 */
@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const code = ERROR_CODE_MAP[exception.name]
    console.log('execption', exception.message)

    const _msg = exception.message as string
    const msg = _msg ?? '系统异常'
    const bizCode = exception.getStatus()
    res.status(code ?? 500).json(new BizResponse(bizCode, msg))
  }
}
