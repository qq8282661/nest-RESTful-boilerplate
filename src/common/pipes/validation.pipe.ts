import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        //  获取数据的类型
        const { metatype } = metadata;
        // console.log('ValidationPipe transform value ', value);
        // console.log('ValidationPipe transform metadata ', metadata);

        // 如果类型不存在或者数据类型是js基本类型直接返回
        if (!metatype || this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        // console.log('ValidationPipe transform  object', object);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return value;
    }

    private toValidate(metatype: Type<any>): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !!types.find((type) => metatype === type);
    }
}
