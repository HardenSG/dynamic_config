import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { IndexService } from './index.service'
import { ConfigPipe } from './pipe'
// import { ConfigGuard } from './user.guard'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { ConfigDTO } from 'src/core/entity/db/mongo/Config'
import { PageSelect } from 'src/core/entity/Page'

@Controller('config')
// @UseGuards(ConfigGuard) /** 局部守卫 */
@ApiTags('基础配置接口')
@ApiBearerAuth()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Post('/save')
  @ApiOperation({ summary: 'B端保存配置' })
  @ApiBody({
    type: ConfigDTO,
  })
  saveConfig(@Body(ConfigPipe) body: ConfigDTO) {
    return this.indexService.saveUser(body)
  }

  @Get()
  @ApiOperation({ summary: '获取该ID下的全部配置' })
  @ApiQuery({ type: Number, name: 'uuid' })
  getConfig(@Query() config: ConfigDTO) {
    return this.indexService.getConfigById(config)
  }

  @Post('/list')
  @ApiOperation({ summary: '获取配置列表' })
  @ApiBody({
    type: PageSelect,
    description: '分页配置',
  })
  getConfigList(@Body() page: PageSelect) {
    return this.indexService.getList(page)
  }
}
