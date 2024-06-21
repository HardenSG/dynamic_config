import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CustomError } from 'src/core/entity/CustomError'
import { ConfigDTO } from 'src/core/entity/db/mongo/Config'
import * as UUID from 'uuid'
import { PageSelect } from 'src/core/entity/Page'

@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(ConfigDTO, 'mongoConnection')
    private readonly configRepository: Repository<ConfigDTO>,
  ) {}

  // /** 通过/:id获取信息 */
  getConfigById(config: ConfigDTO) {
    try {
      const { uuid } = config
      return this.configRepository
        .findOne({
          where: {
            uuid,
          },
        })
        .then((res) => ({ ...res, _id: undefined }))
    } catch (err) {
      throw new CustomError(err, 500)
    }
  }

  async saveConfig(config: ConfigDTO) {
    try {
      const uuid = config.uuid ?? UUID.v4()
      /** TODO: 后面加redis从缓存里面取配置 */
      const _config =
        (await this.configRepository.findOne({
          where: {
            uuid,
          },
        })) ?? {}
      await this.configRepository.save({
        ..._config,
        ...config,
        uuid,
        date: new Date(),
      })
      return
    } catch (err) {
      throw new CustomError(err, 500)
    }
  }

  // /** 获取列表 */
  async getList({ size, page }: PageSelect) {
    console.log(size, page)
    try {
      const _page = page - 1 <= 0 ? 0 : page - 1
      const lists = await this.configRepository.find({
        skip: _page * size,
        order: {
          date: 'ASC',
        },
        select: ['uuid', 'config_json', 'date'],
      })
      const total = await this.configRepository.count()
      return {
        lists: lists.map((c) => ({ ...c, _id: undefined })),
        total,
      }
    } catch (err) {
      throw new CustomError(err, 500)
    }
  }
}
