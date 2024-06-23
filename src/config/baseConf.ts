import { DbLogger, loggerConf } from 'src/core/middleware/logger/factory'
import { TConfig } from '.'

const _path = {
  cwd: process.cwd(),
}

export default {
  db: {
    mongo: {
      type: 'mongodb',
      retryAttempts: 10,
      retryDelay: 500,
      // autoLoadEntities: true, // 自动加载实体
      entities: [_path.cwd + '/dist/core/entity/db/mongo/*{.ts,.js}'], // '/mongodb-entities/*.entity{.ts,.js}'
      name: 'mongoConnection',
      logger: new DbLogger(),
    },
  },
  log: loggerConf,
} as unknown as TConfig
