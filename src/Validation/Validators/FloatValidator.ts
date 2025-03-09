import { BadTypeError } from "#/errors"
import type { TypeValidator } from "../SchemaValidation"

export class FloatValidator implements TypeValidator<number> {
    validate(value: unknown): number {
        if(typeof value !== 'number') {
            throw new BadTypeError('number', typeof value)
        }

        return value
    }
}