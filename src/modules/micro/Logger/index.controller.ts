import { Controller, Post, Body } from '@nestjs/common'
import { RabbitMQService } from './index.service'

@Controller('rabbitmq')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('send')
  async sendMessage(@Body('message') message: string) {
    return this.rabbitMQService.sendMessage('message_pattern', {
      text: message,
    })
  }
}
