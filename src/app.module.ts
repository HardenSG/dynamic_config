import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { IndexModule } from './modules/config/index.module'
import { LoggerMiddleware } from './core/middleware/logger'
import { TypeOrmModule } from '@nestjs/typeorm'
import { loadConfig } from './config'
import { LoggerMicroModule } from './modules/micro/Logger/index.module'

@Module({
  imports: [
    LoggerMicroModule,
    TypeOrmModule.forRoot(loadConfig().db.mongo),
    IndexModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({
        path: '*',
        method: RequestMethod.OPTIONS,
      })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }
}
