import { Module } from '@nestjs/common'
import { IndexController } from './index.controller'
import { IndexService } from './index.service'
import { Heartbeat } from './heartbeat.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigDTO } from 'src/core/entity/db/mongo/Config'
import { LoggerMicroModule } from '../micro/Logger/http.module'

@Module({
  imports: [
    LoggerMicroModule,
    TypeOrmModule.forFeature([ConfigDTO], 'mongoConnection'),
  ],
  controllers: [IndexController, Heartbeat],
  providers: [IndexService],
})
export class IndexModule {}
