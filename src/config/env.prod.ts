import baseConf from './baseConf'
import { merge } from 'lodash'
import { TConfig } from './index'

const prodConfig: Partial<TConfig> = {
  db: {
    mongo: {
      host: 'mongo',
      port: 27017,
      username: 'config',
      password: 'password',
      database: 'dynamic_config',
      synchronize: false, // 线上需要关闭
    },
  },
}

export default merge({}, baseConf, prodConfig)
