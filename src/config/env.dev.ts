import baseConf from './baseConf'
import { merge } from 'lodash'

import { TConfig } from './index'

const devConfig: Partial<TConfig> = {
  db: {
    mongo: {
      host: '127.0.0.1',
      port: 27017,
      database: 'dynamic_config',
      username: 'config',
      password: 'password',
      synchronize: true,
    },
  },
}

export default merge({}, baseConf, devConfig)
