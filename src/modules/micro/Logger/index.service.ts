import { Injectable } from '@nestjs/common'
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices'

@Injectable()
export class RabbitMQService {
  private client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqp://LTAI5tFaPWqSF35Y1QyJZ99Z:MjpyYWJiaXRtcS1zZXJ2ZXJsZXNzLWNuLWxiajN0Zmw1MTA0OkxUQUk1dEZhUFdxU0YzNVkxUXlKWjk5Wg==:MUE4QzdEODI3NTM5MjIzRkM1NjdEOTg4QUUzMjYzQTYzNjM3NzdBMzoxNzIyNjc0NDMyNjEz@rabbitmq-serverless-cn-lbj3tfl5104.cn-beijing.amqp-22.net.mq.amqp.aliyuncs.com:5672',
        ],
        queue: 'logger_queue',
        queueOptions: {
          durable: true,
        },
      },
    })
  }

  sendMessage(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise()
  }
}
