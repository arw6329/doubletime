import { BadFormatError, BadTypeError } from "#/errors"
import { TypeValidator } from "../TypeValidator"
import { StringValidator } from "./StringValidator"

export class BooleanValidator extends TypeValidator<boolean> {
    constructor(
        private acceptBooleanLike: boolean = false
    ) { super() }

    validate(value: unknown): boolean {
        if(value === true || value === false) {
            return value
        }

        if(!this.acceptBooleanLike) {
            throw new BadTypeError('boolean', typeof value)
        }

        if(typeof value === 'number') {
            if(value === 0) {
                return false
            } else if(value === 1) {
                return true
            } else {
                throw new BadFormatError(value.toString(), 'boolean-like number (0 or 1)')
            }
        }

        const strValue = new StringValidator({ minLength: 1, trim: true }).validate(value)

        if(strValue === 'true' || strValue === '1') {
            return true
        } else if(strValue === 'false' || strValue === '0') {
            return false
        } else {
            throw new BadFormatError(strValue, 'boolean-like string ("true" or "false" or "0" or "1")')
        }
    }
}