import { BadFormatError } from "#/errors"
import type { TypeValidator } from "../SchemaValidation"
import { StringValidator } from "./StringValidator"

export class StringBackedEnumValidator<E extends { [key: number]: string }> implements TypeValidator<E[keyof E]> {
    constructor(
        private enumObj: E
    ) {}
    
    validate(value: unknown): E[keyof E] {
        const strValue = new StringValidator({ minLength: 1 }).validate(value)

        for(const value of Object.values(this.enumObj) as Array<E[keyof E]>) {
            if(value === strValue) {
                return value as E[keyof E]
            }
        }

        // TODO
        throw new BadFormatError(strValue, 'enum')
    }
}