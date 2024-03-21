import {ArgumentMetadata, HttpException, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/valiadation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value)
        const errors = await validate(obj)

        if (errors.length) {
            let messages = errors.map(error => {
                return `${error.property} - ${Object.values(error).join(", ")}`
            })
            throw new ValidationException(messages)
        }

        return value
    }
}