import { BadFormatError, BadTypeError, BadValueError } from "#/errors"
import type { TypeValidator } from "../SchemaValidation"

export interface IntegerValidatorOptions {
    parseStrings?: boolean,
    min?: number,
    max?: number,
    parity?: 'even' | 'odd',
    ensure?: (value: number) => boolean
}

export class IntegerValidator implements TypeValidator<number> {
    constructor(
        private options: IntegerValidatorOptions = {}
    ) {}

    validate(value: unknown): number {
        if(this.options.parseStrings && typeof value === 'string') {
            const parsedValue = parseInt(value)

            if(Number.isNaN(parsedValue)) {
                throw new BadFormatError(value, 'integer string')
            }

            value = parsedValue
        }

        if(typeof value !== 'number') {
            throw new BadTypeError('number', typeof value)
        }

        if(!Number.isInteger(value)) {
            throw new BadFormatError(value.toString(), 'integer')
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

        if(this.options.parity !== undefined) {
            if(
                (this.options.parity === 'even' && Math.abs(value % 2) !== 0)
                || (this.options.parity === 'odd' && Math.abs(value % 2) !== 1)
            ) {
                throw new BadValueError(value.toString(), `value is not ${this.options.parity}`)
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