import type { TypeValidator } from "../SchemaValidation"
import { StringValidator } from "./StringValidator"

export class BooleanValidator implements TypeValidator<boolean> {
    constructor(
        private acceptBooleanLike: boolean = false
    ) {}

    validate(value: unknown): [value: null, error: string] | [value: boolean, error: null] {
        if(value === true || value === false) {
            return [value, null]
        }

        if(!this.acceptBooleanLike) {
            return [null, 'value not of expected type']
        }

        if(typeof value === 'number') {
            if(value === 0) {
                return [false, null]
            } else if(value === 1) {
                return [true, null]
            } else {
                return [null, 'value not of expected type']
            }
        }

        const [strValue, error] = new StringValidator(false, true).validate(value)

        if(error !== null) {
            return [null, error]
        }

        if(strValue === 'true' || strValue === '1') {
            return [true, null]
        } else if(strValue === 'false' || strValue === '0') {
            return [false, null]
        } else {
            return [null, 'value not of expected type']
        }
    }
}