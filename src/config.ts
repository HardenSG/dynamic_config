const env = process.env.ENV
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import dev from './env.dev'
import prod from './env.prod'

export const loadConfig = (): TConfig => {
  const _config: {
    dev: TConfig
    prod: TConfig
  } = {
    dev,
    prod,
  }
  return _config[env]
}

export type TConfig = {
  db: {
    mongo: TypeOrmModuleOptions
  }
}
