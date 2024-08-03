import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiOperation } from '@nestjs/swagger'

@Controller('heartbeat')
export class Heartbeat {
  constructor(
    @Inject('LOGGER_MICRO_SERVICE') private readonly client: ClientProxy,
  ) {}
  @Get()
  @ApiOperation({ summary: '心跳检测' })
  public heartbeat() {
    // return 'Hello World'
    return this.client
      .send('config:heartbeat', {
        from: 'dynamic_config',
        target: 'heart_beat_check',
      })
      .toPromise()
  }
}
