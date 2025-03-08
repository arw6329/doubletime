import type { TypeValidator } from "../SchemaValidation"
import { StringValidator } from "./StringValidator"

export class UTCTimestampValidator implements TypeValidator<Date> {
    constructor(
        private parseStrings: boolean
    ) {}
    
    validate(value: unknown): [value: null, error: string] | [value: Date, error: null] {
        if(value instanceof Date) {
            return [value, null]
        }

        if(!this.parseStrings) {
            return [null, 'value not of expected type']
        }

        const [strValue, error] = new StringValidator(false, true).validate(value)

        if(error !== null) {
            return [null, error]
        }

        if(!/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d$/.test(strValue)) {
            return [null, 'value not of expected type']
        }
    
        const date = new Date(Date.UTC(parseInt(strValue.substring(0, 4)), parseInt(strValue.substring(5, 7)) - 1, parseInt(strValue.substring(8, 10)), parseInt(strValue.substring(11, 13)), parseInt(strValue.substring(14, 16)), parseInt(strValue.substring(17))))

        return [date, null]
    }
}