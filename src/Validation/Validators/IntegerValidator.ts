import type { TypeValidator } from "../SchemaValidation"

export class IntegerValidator implements TypeValidator<number> {
    validate(value: unknown): [value: null, error: string] | [value: number, error: null] {
        if(typeof value !== 'number') {
            return [null, 'value not of expected type']
        }

        if(!Number.isInteger(value)) {
            return [null, 'decimal values are not accepted']
        }

        return [value, null]
    }
}