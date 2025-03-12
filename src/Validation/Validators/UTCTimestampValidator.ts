import { BadFormatError, BadTypeError } from "#/errors"
import { TypeValidator } from "../TypeValidator"
import { StringValidator } from "./StringValidator"

export class UTCTimestampValidator extends TypeValidator<Date> {
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

        if(!/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d$/.test(strValue)) {
            throw new BadFormatError(strValue, 'yyyy-mm-dd hh:mm:ss timestamp string')
        }
    
        const date = new Date(Date.UTC(parseInt(strValue.substring(0, 4)), parseInt(strValue.substring(5, 7)) - 1, parseInt(strValue.substring(8, 10)), parseInt(strValue.substring(11, 13)), parseInt(strValue.substring(14, 16)), parseInt(strValue.substring(17))))

        return date
    }
}