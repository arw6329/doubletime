import { BadTypeError, BadValueError, SchemaValidationError } from "#/errors"
import type { TypeValidator } from "../SchemaValidation"

export interface StringValidatorOptions {
    minLength?: number,
    maxLength?: number,
    match?: RegExp,
    trim?: boolean,
    ensure?: (string: string) => boolean,
    transform?: (string: string) => string
}

export class StringValidator implements TypeValidator<string> {
    constructor(
        private options: StringValidatorOptions = {}
    ) {}

    validate(value: unknown): string {
        if(typeof value !== 'string') {
            throw new BadTypeError('string', typeof value)
        }

        let strValue = value

        if(this.options.trim) {
            strValue = strValue.trim()
        }

        if(this.options.minLength !== undefined) {
            if(strValue.length < this.options.minLength) {
                throw new BadValueError(strValue, `minimum accepted length is ${this.options.minLength}`)
            }
        }

        if(this.options.maxLength !== undefined) {
            if(strValue.length > this.options.maxLength) {
                throw new BadValueError(strValue, `maximum accepted length is ${this.options.maxLength}`)
            }
        }

        if(this.options.match && !this.options.match.test(strValue)) {
            throw new BadValueError(strValue, `input must match regular expression ${this.options.match.toString()}`)
        }

        if(this.options.ensure !== undefined) {
            if(!this.options.ensure(strValue)) {
                throw new BadValueError(strValue, `value did not pass a custom validation function`)
            }
        }

        if(this.options.transform) {
            strValue = this.options.transform(strValue)
        }

        return strValue
    }
}