import { BadFormatError, BadTypeError } from "#/errors"
import type { TypeValidator } from "../SchemaValidation"

export class IntegerValidator implements TypeValidator<number> {
    validate(value: unknown): number {
        if(typeof value !== 'number') {
            throw new BadTypeError('number', typeof value)
        }

        if(!Number.isInteger(value)) {
            throw new BadFormatError(value.toString(), 'integer')
        }

        return value
    }
}