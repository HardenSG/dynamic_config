import { Module } from '@nestjs/common'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'

@Module({
  imports: [],
  controllers: [
    /* 控制器 */
  ],
  providers: [
    {
      provide: 'LOGGER_MICRO_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP, // 根据实际情况选择传输协议
          options: {
            // 连接 Logger_Micro 的地址和端口
            host: '127.0.0.1',
            port: 3001, // 假设 Logger_Micro 在 4000 端口上运行
          },
        })
      },
    },
  ],
  exports: ['LOGGER_MICRO_SERVICE'], // 导出 Logger_Micro 服务，以便其他模块使用
})
export class LoggerMicroModule {}
