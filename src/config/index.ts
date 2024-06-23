const env = process.env.ENV
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import dev from './env.dev'
import prod from './env.prod'
import { Configuration } from 'log4js'

type TEnvConfig = {
  dev: TConfig
  prod: TConfig
}

export type TConfig = {
  db: {
    mongo: TypeOrmModuleOptions
  }
  log: Partial<Configuration>
}

export const loadConfig = (): TConfig => {
  const _config: TEnvConfig = {
    dev,
    prod,
  }
  return _config[env]
}
