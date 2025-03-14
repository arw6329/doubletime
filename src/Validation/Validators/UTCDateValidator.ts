import { BadFormatError, BadTypeError } from "#/errors"
import { TypeValidator } from "../TypeValidator"
import { StringValidator } from "./StringValidator"

export class UTCDateValidator extends TypeValidator<Date> {
    constructor(
        private parseStrings: boolean
    ) { super() }

    validate(value: unknown): Date {
        if(value instanceof Date) {
            return value
        }

        if(!this.parseStrings) {
            throw new BadTypeError('Date', typeof value)
        }

        const strValue = new StringValidator({ minLength: 1, trim: true }).validate(value)

        if(!/^\d\d\d\d-\d\d-\d\d$/.test(strValue)) {
            throw new BadFormatError(strValue, 'yyyy-mm-dd date string')
        }
    
        const date = new Date(Date.UTC(parseInt(strValue.substring(0, 4)), parseInt(strValue.substring(5, 7)) - 1, parseInt(strValue.substring(8, 10))))

        return date
    }
}