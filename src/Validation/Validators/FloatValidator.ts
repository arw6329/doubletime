import type { TypeValidator } from "../SchemaValidation"

export class FloatValidator implements TypeValidator<number> {
    validate(value: unknown): [value: null, error: string] | [value: number, error: null] {
        if(typeof value !== 'number') {
            return [null, 'value not of expected type']
        }

        return [value, null]
    }
}