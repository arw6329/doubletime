import { BadFormatError, BadTypeError, BadValueError } from "#/errors"
import { TypeValidator } from "../TypeValidator"

export interface FloatValidatorOptions {
    parseStrings?: boolean,
    min?: number,
    max?: number,
    ensure?: (value: number) => boolean
}

export class FloatValidator extends TypeValidator<number> {
    constructor(
        private options: FloatValidatorOptions = {}
    ) { super() }

    validate(value: unknown): number {
        if(this.options.parseStrings && typeof value === 'string') {
            const parsedValue = parseFloat(value)

            if(Number.isNaN(parsedValue)) {
                throw new BadFormatError(value, 'numeric string')
            }

            value = parsedValue
        }

        if(typeof value !== 'number') {
            throw new BadTypeError('number', typeof value)
        }

        if(this.options.min !== undefined) {
            if(value < this.options.min) {
                throw new BadValueError(value.toString(), `minimum accepted value is ${this.options.min}`)
            }
        }

        if(this.options.max !== undefined) {
            if(value > this.options.max) {
                throw new BadValueError(value.toString(), `maximum accepted value is ${this.options.max}`)
            }
        }

        if(this.options.ensure !== undefined) {
            if(!this.options.ensure(value)) {
                throw new BadValueError(value.toString(), `value did not pass a custom validation function`)
            }
        }

        return value
    }
}