import { Configuration } from 'log4js'

const logBasePath = process.cwd() + '/logs'

export const loggerConf: Configuration = {
  appenders: {
    console: { type: 'console' },
    /* 统计日志 */
    access: {
      type: 'dateFile',
      filename: `${logBasePath}/access/access.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd',
      numBackups: 7,
      category: 'http',
      keepFileExt: true,
    },
    /* App日志 */
    app: {
      type: 'dateFile',
      filename: `${logBasePath}/app/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          "[%d{yyyy-MM-dd hh:mm:ss SSS}] [%p] -h: %h -pid: %z  msg: '%m' ",
      }, // 自定义的输出格式, 可参考 https://blog.csdn.net/hello_word2/article/details/79295344
      pattern: 'yyyy-MM-dd',
      numBackups: 7,
      keepFileExt: true,
    },
    /* 异常日志 */
    errors: {
      type: 'dateFile',
      filename: `${logBasePath}/error/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          "[%d{yyyy-MM-dd hh:mm:ss SSS}] | [%p] -h: %h -pid: %z  msg: '%m' ",
      },
      pattern: 'yyyy-MM-dd',
      numBackups: 7,
      keepFileExt: true,
    },
  },
  categories: {
    default: {
      appenders: ['console', 'access', 'app', 'errors'],
      level: 'DEBUG',
    },
    mongo: { appenders: ['access', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
}
