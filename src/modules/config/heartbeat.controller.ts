import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

@Controller('heartbeat')
export class Heartbeat {
  @Get()
  @ApiOperation({ summary: '心跳检测' })
  public heartbeat() {
    return 'Hello World'
  }
}
