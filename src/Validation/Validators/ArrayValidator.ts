import type { TypeValidator } from "../SchemaValidation"

export class ArrayValidator<T> implements TypeValidator<Array<T>> {
    constructor(
        private elemValidator: TypeValidator<T>
    ) {}

    validate(value: unknown): [value: null, error: string] | [value: Array<T>, error: null] {
        if(value instanceof Array) {
            const parsedArray: Array<T> = []

            for(let i = 0; i < value.length; i++) {
                const [parsedElem, error] = this.elemValidator.validate(value[i])

                if(error !== null) {
                    return [null, error]
                }

                parsedArray.push(parsedElem)
            }

            return [parsedArray, null]
        }

        return [null, 'value not of expected type']
    }
}