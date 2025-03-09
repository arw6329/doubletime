import { BadFormatError, BadTypeError, SchemaValidationError } from "#/errors"
import type { TypeValidator } from "../SchemaValidation"

export class StringValidator implements TypeValidator<string> {
    constructor(
        private acceptEmpty: boolean,
        private trim: boolean
    ) {}

    validate(value: unknown): string {
        if(typeof value !== 'string') {
            throw new BadTypeError('string', typeof value)
        }

        let strValue = value

        if(this.trim) {
            strValue = strValue.trim()
        }

        if(!this.acceptEmpty && strValue === '') {
            throw new SchemaValidationError('empty string is not accepted')
        }

        return strValue
    }
}