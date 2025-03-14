import { BadFormatError, BadSchemaError } from "#/errors"
import { TypeValidator } from "../TypeValidator"
import { StringValidator } from "./StringValidator"

export class EnumValidator<T extends string> extends TypeValidator<T> {
    private enumValues: T[]

    constructor(
        ...enumValues: T[]
    ) {
        super()

        if(enumValues.length === 0) {
            throw new BadSchemaError('string enum validators must contain at least one enum value')
        }

        this.enumValues = enumValues
    }
    
    validate(value: unknown): T {
        const strValue = new StringValidator({ minLength: 1 }).validate(value)

        if(!(this.enumValues as string[]).includes(strValue)) {
            throw new BadFormatError(strValue, `enum of (${this.enumValues.join(' | ')})`)
        }

        return strValue as T
    }   
}
