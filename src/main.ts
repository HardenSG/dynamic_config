import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { /** ValidationPipe */ VersioningType } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ResInter } from './core/interceptor/response'
import { ErrorFilter } from './core/interceptor/catchError'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { readFileSync } from 'fs'
// import { UserGuard } from './modules/base1/user.guard'

async function bootstrap() {
  const createOpts = {}
  if (process.env.ENV !== 'dev') {
    try {
      const isTLSExist = readFileSync('/opt/cert/805807.cn.key')
      if (isTLSExist.length > 0) {
        Object.assign(createOpts, {
          httpsOptions: {
            key: readFileSync('/opt/cert/805807.cn.key'),
            cert: readFileSync('/opt/cert/805807.cn_bundle.pem'),
          },
        })
      }
    } catch {
      console.log(' === 不存在证书 === ')
    }
  }

  /** 创建根组件 */
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    ...createOpts,
  })
  /** 开启跨域 */
  app.enableCors()
  /** 开启版本，例如 api/v1.1/initByXid */
  app.enableVersioning({
    type: VersioningType.URI,
  })

  /** 过滤器 */
  app.useGlobalFilters(new ErrorFilter())
  /** 配置响应拦截器 */
  app.useGlobalInterceptors(new ResInter())

  /** 初始化swagger  */
  const options = new DocumentBuilder()
  options.setTitle('动态配置系统')
  options.setDescription('动态配置平台接口文档')
  options.setVersion('v0.9')

  const opt = options.build()
  const doc = SwaggerModule.createDocument(app, opt)
  SwaggerModule.setup('api-docs', app, doc)
  /** swagger END */
  await app.listen(3001)
}
bootstrap()
