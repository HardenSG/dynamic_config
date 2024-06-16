import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Observable } from 'rxjs'

/** 用户的守卫 */
@Injectable()
export class ConfigGuard implements CanActivate {
  /** method或者controller使用SetMetaData存储的数据需要通过反射拿到 */
  constructor(private readonly reflect: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(' === guard 守卫 === ')
    const roles: string[] = this.reflect.get('roles', context.getHandler())
    console.log(' == role == ', roles)
    const req = context.switchToHttp().getRequest<Request>()
    let ability = req.query?.['ability'] as string[]
    ability = Array.isArray(ability) ? ability : [ability]

    const hasRole =
      roles.length === 0 || ability.some((abi) => roles.includes(abi))
    if (!hasRole) return false
    return true
  }
}
