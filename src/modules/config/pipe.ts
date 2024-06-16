import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { PassError } from 'src/core/entity/CustomError'

@Injectable()
export class ConfigPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value)
    const errors = await validate(DTO)

    if (errors.length > 0) {
      console.log(' === errors === ', errors)
      const constraints = errors[0].constraints
      const firstError = constraints[Object.keys(constraints)[0]]
      throw new PassError(firstError, HttpStatus.BAD_REQUEST)
    }
    return value
  }
}
