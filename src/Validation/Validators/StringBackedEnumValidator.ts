import type { TypeValidator } from "../SchemaValidation"
import { StringValidator } from "./StringValidator"

export class StringBackedEnumValidator<E extends { [key: number]: string }> implements TypeValidator<E[keyof E]> {
    constructor(
        private enumObj: E
    ) {}
    
    validate(value: unknown): [value: null, error: string] | [value: E[keyof E], error: null] {
        const [strValue, error] = new StringValidator(false, false).validate(value)

        if(error !== null) {
            return [null, error]
        }

        for(const value of Object.values(this.enumObj) as Array<E[keyof E]>) {
            if(value === strValue) {
                return [value as E[keyof E], null]
            }
        }

        return [null, 'value was not a member of enum']
    }
}