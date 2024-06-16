import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

/** 分页查询参数 */
export class PageSelect {
  @IsNotEmpty({ message: '页数不能为空' })
  @ApiProperty({ description: '当前页数，默认从1开始', required: true })
  page: number

  @IsNotEmpty({ message: '分页大小不能为空' })
  @ApiProperty({ description: '分页大小', required: true })
  size: number

  @IsOptional()
  @ApiProperty({ description: '关键字搜索', required: false })
  keyword: string
}
