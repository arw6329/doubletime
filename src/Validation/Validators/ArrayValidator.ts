import { BadTypeError, SchemaValidationError } from "#/errors"
import type { TypeValidator } from "../SchemaValidation"

export class ArrayValidator<T> implements TypeValidator<Array<T>> {
    constructor(
        private elemValidator: TypeValidator<T>
    ) {}

    validate(value: unknown): Array<T> {
        if(Array.isArray(value)) {
            const parsedArray: Array<T> = []

            for(let i = 0; i < value.length; i++) {
                try {
                    const parsedElem = this.elemValidator.validate(value[i])
                    parsedArray.push(parsedElem)
                } catch(e) {
                    if(e instanceof Error) {
                        throw new SchemaValidationError(`error in array member: ${e.message}`)
                    } else {
                        throw e
                    }
                }
            }

            return parsedArray
        }

        throw new BadTypeError('array', typeof value)
    }
}