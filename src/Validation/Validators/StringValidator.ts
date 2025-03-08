import type { TypeValidator } from "../SchemaValidation"

export class StringValidator implements TypeValidator<string> {
    constructor(
        private acceptEmpty: boolean,
        private trim: boolean
    ) {}

    validate(value: unknown): [value: null, error: string] | [value: string, error: null] {
        if(typeof value !== 'string') {
            return [null, 'value not of expected type']
        }

        let strValue = value

        if(this.trim) {
            strValue = strValue.trim()
        }

        if(!this.acceptEmpty && strValue === '') {
            return [null, 'value must not be empty']
        }

        return [strValue, null]
    }
}