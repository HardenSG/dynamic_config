import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common'
import { Request } from 'express'

/** TODO: 自定义装饰器 */
export const Role = (...args: string[]) => SetMetadata('roles', args)

/** 参数装饰器 */
export const reqUrl = createParamDecorator(
  (data: string /** 接收装饰器的参数 */, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>()
    console.log('data', data)
    return req.url
    /** TODO: 扩展聚合装饰器？ */
  },
)
