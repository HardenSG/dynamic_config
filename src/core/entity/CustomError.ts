import { HttpException } from '@nestjs/common'

export class CustomError extends HttpException {
  name = 'CustomError'
  constructor(bizCode?: number)
  constructor(message: string, bizCode?: number)
  constructor(message, bizCode = 0) {
    super(message, bizCode)
    super.initCause()
    super.initMessage()
  }
}

export class PassError extends CustomError {
  name = 'PassError'
  constructor(bizCode?: number)
  constructor(message: string, bizCode?: number)
  constructor(message, bizCode = 0) {
    super(message, bizCode)
  }
}
