import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm'

@Entity('x_config')
export class ConfigDTO {
  @IsOptional()
  @ObjectIdColumn()
  @ApiHideProperty()
  _id: ObjectId

  @IsOptional()
  @Column()
  @ApiProperty({ description: '全局配置唯一id', required: false, type: String })
  uuid: string

  @Column('json')
  @IsNotEmpty()
  @ApiProperty({ description: '配置内容', required: true, type: String })
  config_json: string

  @CreateDateColumn()
  @IsOptional()
  date: Date
}
