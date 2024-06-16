import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const cwd = process.cwd()

export const mongoDB: TypeOrmModuleOptions = {
  type: 'mongodb',
  username: 'config',
  password: 'password',
  host: '127.0.0.1',
  port: 27017,
  database: 'dynamic_config',
  retryAttempts: 10,
  retryDelay: 500,
  synchronize: true, // 线上需要关闭
  // autoLoadEntities: true, // 自动加载实体
  entities: [cwd + '/dist/core/entity/db/mongo/*{.ts,.js}'], // '/mongodb-entities/*.entity{.ts,.js}'
  name: 'mongoConnection',
}
