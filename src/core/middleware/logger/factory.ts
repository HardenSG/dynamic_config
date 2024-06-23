export * from './config'
import { loggerConf } from './config'
import * as Path from 'path'
import * as Log4js from 'log4js'
import * as Util from 'util'
import * as Moment from 'moment' // 处理时间的工具
import * as StackTrace from 'stacktrace-js'
// import Chalk from 'chalk'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Chalk = require('chalk')
// import { QueryRunner } from 'typeorm'

export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

// 内容跟踪类
export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

// 添加用户自定义的格式化布局函数。 可参考: https://log4js-node.github.io/log4js-node/layouts.html
Log4js.addLayout('json', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName: string = ''
    let position: string = ''

    // 日志组装
    const messageList: string[] = []
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context
        // 显示触发日志的坐标（行，列）
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`
        }
        return
      }

      if (typeof value !== 'string') {
        value = Util.inspect(value, false, 3, true)
      }

      messageList.push(value)
    })

    // 日志组成部分
    const messageOutput: string = messageList.join(' ')
    const positionOutput: string = position ? ` [${position}]` : ''
    const typeOutput: string = `[${logConfig.type}] ${logEvent.pid.toString()}   - `
    const dateOutput: string = `${Moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss')}`
    const moduleOutput: string = moduleName
      ? `[${moduleName}] `
      : '[LoggerService] '
    let levelOutput: string = `[${logEvent.level}] ${messageOutput}`

    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput)
        break
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput)
        break
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput)
        break
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput)
        break
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput)
        break
      default:
        levelOutput = Chalk.grey(levelOutput)
        break
    }

    return `${Chalk.green(typeOutput)}${dateOutput}  ${Chalk.yellow(moduleOutput)}${levelOutput}${positionOutput}`
  }
})

// 注入配置
Log4js.configure(loggerConf)

// 实例化
const logger = Log4js.getLogger('default')
const mogoLogger = Log4js.getLogger('mongo') // 添加了typeorm 日志实例
logger.level = LoggerLevel.TRACE

// 定义log类方法
export class CustomLogger {
  static trace(...args) {
    logger.trace(CustomLogger.getStackTrace(), ...args)
  }

  static debug(...args) {
    logger.debug(CustomLogger.getStackTrace(), ...args)
  }

  static log(...args) {
    logger.info(CustomLogger.getStackTrace(), ...args)
  }

  static info(...args) {
    logger.info(CustomLogger.getStackTrace(), ...args)
  }

  static warn(...args) {
    logger.warn(CustomLogger.getStackTrace(), ...args)
  }

  static warning(...args) {
    logger.warn(CustomLogger.getStackTrace(), ...args)
  }

  static error(...args) {
    logger.error(CustomLogger.getStackTrace(), ...args)
  }

  static fatal(...args) {
    logger.fatal(CustomLogger.getStackTrace(), ...args)
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http')
    loggerCustom.info(CustomLogger.getStackTrace(), ...args)
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  // StackTrace 可参考 https://www.npmjs.com/package/stacktrace-js
  static getStackTrace(deep: number = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync()
    const stackInfo: StackTrace.StackFrame = stackList[deep]
    const lineNumber: number = stackInfo.lineNumber
    const columnNumber: number = stackInfo.columnNumber
    const fileName: string = stackInfo.fileName
    const basename: string = Path.basename(fileName)
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`
  }
}

// 自定义typeorm 日志器, 可参考 https://blog.csdn.net/huzzzz/article/details/103191803/
export class DbLogger implements CustomLogger {
  logQuery(query: string) {
    mogoLogger.info(query)
  }

  logQueryError(error: string, query: string) {
    mogoLogger.error(query, error)
  }

  logQuerySlow(time: number, query: string) {
    mogoLogger.info(query, time)
  }

  logSchemaBuild(message: string) {
    mogoLogger.info(message)
  }

  logMigration(message: string) {
    mogoLogger.info(message)
  }
  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'info': {
        mogoLogger.info(message)
        break
      }
      case 'warn': {
        mogoLogger.warn(message)
      }
    }
  }
}
